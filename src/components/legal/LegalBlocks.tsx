import { Fragment } from "react";
import { LegalInlineContent } from "@/components/legal/LegalInlineContent";
import { LegalTable } from "@/components/legal/LegalTable";
import type { LegalBlock, LegalListBlock } from "@/types/legal";

const LegalList = ({ list }: { list: LegalListBlock }) => {
  const ListTag = list.isOrdered ? "ol" : "ul";
  return (
    <ListTag
      className={
        list.isOrdered
          ? "my-4 flex list-decimal flex-col gap-2 pl-6 marker:font-bold marker:text-ink-3"
          : "my-4 flex list-disc flex-col gap-2 pl-6 marker:text-ink-3"
      }
    >
      {list.items.map((item, index) => (
        <li key={`item-${index}`} className="pl-1">
          <LegalInlineContent nodes={item.content} />
          {item.nested && <LegalList list={item.nested} />}
        </li>
      ))}
    </ListTag>
  );
};

interface LegalBlocksProps {
  blocks: LegalBlock[];
}

/** Cuerpo de un documento legal, bloque a bloque. */
export const LegalBlocks = ({ blocks }: LegalBlocksProps) => (
  <>
    {blocks.map((block, index) => {
      const key = `${block.type}-${index}`;
      switch (block.type) {
        case "heading":
          return block.level === 2 ? (
            <h2 key={key} id={block.id} className="mt-14 mb-4 type-h3 text-ink first:mt-0">
              <LegalInlineContent nodes={block.content} />
            </h2>
          ) : (
            <h3 key={key} id={block.id} className="mt-8 mb-3 type-tile text-ink">
              <LegalInlineContent nodes={block.content} />
            </h3>
          );
        case "paragraph":
          return (
            <p key={key} className="my-4">
              {block.lines.map((line, lineIndex) => (
                <Fragment key={`line-${lineIndex}`}>
                  {lineIndex > 0 && <br />}
                  <LegalInlineContent nodes={line} />
                </Fragment>
              ))}
            </p>
          );
        case "list":
          return <LegalList key={key} list={block} />;
        case "table":
          return <LegalTable key={key} table={block} />;
      }
    })}
  </>
);
