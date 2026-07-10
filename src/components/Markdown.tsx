import React from "react";

// Minimal, safe markdown renderer for lesson prose.
// Supports: paragraphs (blank line), `-` bullet lists, **bold**, *italic*, `code`, and → arrows.
// No raw HTML is ever rendered — inline formatting is parsed into React nodes.

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // token regex: bold, italic, code
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (tok.startsWith("**")) nodes.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("`")) nodes.push(<code key={key}>{tok.slice(1, -1)}</code>);
    else nodes.push(<em key={key}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const isList = lines.every((l) => l.trim().startsWith("- ") || l.trim() === "");
        if (isList && lines.some((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={bi}>
              {lines
                .filter((l) => l.trim().startsWith("- "))
                .map((l, li) => (
                  <li key={li}>
                    <span>{renderInline(l.trim().slice(2), `${bi}-${li}`)}</span>
                  </li>
                ))}
            </ul>
          );
        }
        // paragraph, preserve single line breaks
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <React.Fragment key={li}>
                {renderInline(l, `${bi}-${li}`)}
                {li < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
