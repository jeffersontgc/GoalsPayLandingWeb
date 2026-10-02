// Copia los documentos legales (../legal/{es,en}/*.md, la fuente de verdad) a content/legal/.
//
//   node scripts/sync-legal.mjs              copia y falla si ../legal no existe
//   node scripts/sync-legal.mjs --if-present copia solo si ../legal existe (prebuild/predev)
//
// content/legal/ se commitea: en Vercel el repo de la landing no tiene ../legal al lado, así
// que el build usa la copia. Después de editar un .md en legal/, corre `yarn legal:sync` y
// commitea el resultado. No edites content/legal/ a mano.

import { copyFile, mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const LANDING_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.resolve(LANDING_DIR, "..", "legal");
const TARGET_DIR = path.join(LANDING_DIR, "content", "legal");
const LOCALES = ["es", "en"];
const VERSION_PATTERN = /^\*\*(?:Versión|Version):\*\*\s*(.+)$/m;
const isOptional = process.argv.includes("--if-present");

const exists = async (target) => {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
};

const readVersion = async (filePath) => {
  const markdown = await readFile(filePath, "utf8");
  const match = VERSION_PATTERN.exec(markdown);
  if (!match) throw new Error(`${filePath} has no **Versión:** / **Version:** line.`);
  return match[1].trim();
};

const syncLocale = async (locale) => {
  const sourceLocaleDir = path.join(SOURCE_DIR, locale);
  const targetLocaleDir = path.join(TARGET_DIR, locale);
  const files = (await readdir(sourceLocaleDir)).filter((file) => file.endsWith(".md"));
  await rm(targetLocaleDir, { recursive: true, force: true });
  await mkdir(targetLocaleDir, { recursive: true });
  const versions = [];
  for (const file of files) {
    const sourcePath = path.join(sourceLocaleDir, file);
    await copyFile(sourcePath, path.join(targetLocaleDir, file));
    versions.push(await readVersion(sourcePath));
  }
  return { count: files.length, versions };
};

const main = async () => {
  if (!(await exists(SOURCE_DIR))) {
    if (isOptional) {
      console.log("sync-legal: ../legal not found, using the committed content/legal copy.");
      return;
    }
    throw new Error(`sync-legal: ${SOURCE_DIR} not found.`);
  }
  const results = await Promise.all(LOCALES.map(syncLocale));
  const allVersions = new Set(results.flatMap((result) => result.versions));
  if (allVersions.size !== 1) {
    throw new Error(`sync-legal: es and en documents have different versions: ${[...allVersions].join(", ")}`);
  }
  const total = results.reduce((sum, result) => sum + result.count, 0);
  console.log(`sync-legal: copied ${total} documents, version ${[...allVersions][0]}.`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
