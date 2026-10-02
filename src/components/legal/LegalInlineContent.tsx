import type { LegalInline } from "@/types/legal";

const LINK_CLASSES = "font-medium text-link underline underline-offset-[3px] hover:decoration-2";
const WEB_LINK_PATTERN = /^https?:/;

interface LegalInlineContentProps {
  nodes: LegalInline[];
}

/** Texto en línea de un documento legal. El contenido es estático, así que el índice es estable. */
export const LegalInlineContent = ({ nodes }: LegalInlineContentProps) => (
  <>
    {nodes.map((node, index) => {
      const key = `${node.type}-${index}`;
      switch (node.type) {
        case "text":
          return <span key={key}>{node.value}</span>;
        case "strong":
          return (
            <strong key={key} className="font-bold text-ink">
              <LegalInlineContent nodes={node.children} />
            </strong>
          );
        case "em":
          return (
            <em key={key}>
              <LegalInlineContent nodes={node.children} />
            </em>
          );
        case "link":
          return (
            <a
              key={key}
              href={node.href}
              className={LINK_CLASSES}
              rel={WEB_LINK_PATTERN.test(node.href) ? "noopener noreferrer" : undefined}
            >
              <LegalInlineContent nodes={node.children} />
            </a>
          );
      }
    })}
  </>
);
