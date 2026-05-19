import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#07091a] p-6 text-center text-slate-100">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">404</p>
        <h1 className="text-3xl font-bold md:text-4xl">Página no encontrada</h1>
        <p className="text-slate-400">La ruta solicitada no existe.</p>
        <Link
          href="/"
          className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 px-5 py-2 text-sm font-medium text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
