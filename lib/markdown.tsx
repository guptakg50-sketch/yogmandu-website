import React from "react";

/**
 * The site's markdown renderer, shared by blog posts and events.
 *
 * It must stay in step with the toolbar in the admin Post/Event editor
 * (components/AdminPanel.jsx). Every marker that toolbar can insert has to be
 * handled here — anything missing is published as literal characters, which is
 * exactly what happened to H3, H4, ~~strike~~, <u>, `code`, numbered lists,
 * code blocks and horizontal rules before this was consolidated.
 *
 * Supported blocks:  ![img](url)  ``` ```  ---  # ## ### ####  1.  >  -
 * Supported inline:  [link](url)  **bold**  ~~strike~~  <u>  `code`  _italic_
 */

const HEADING_SIZES: Record<number, string> = { 1: "2.2rem", 2: "1.8rem", 3: "1.45rem", 4: "1.2rem" };

/** Trim to a word boundary rather than mid-word, with an ellipsis. */
export function trimTo(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

/** Strip markdown so text taken from a body reads as plain prose. */
export function stripMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")    // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")  // links → their label
    .replace(/https?:\/\/\S+/g, " ")          // bare URLs read as junk in a snippet
    .replace(/[#>*_`~]/g, " ")
    .replace(/<\/?u>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Render one block of inline text. The <u> tag is parsed into a real element
 * rather than injected as HTML, so nothing typed into a body can inject markup.
 */
export function renderInline(text: string, keyPrefix: string, accent = "#6B2D8B"): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern =
    /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|~~([^~]+)~~|<u>([\s\S]*?)<\/u>|`([^`]+)`|_([^_]+)_/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] && match[2]) {
      nodes.push(
        <a key={`${keyPrefix}-${i++}`} href={match[2]} target={match[2].startsWith("http") ? "_blank" : undefined}
          rel={match[2].startsWith("http") ? "noopener noreferrer" : undefined}
          style={{ color: accent, textDecoration: "underline" }}>
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(<strong key={`${keyPrefix}-${i++}`}>{match[3]}</strong>);
    } else if (match[4]) {
      nodes.push(<s key={`${keyPrefix}-${i++}`}>{match[4]}</s>);
    } else if (match[5]) {
      nodes.push(<u key={`${keyPrefix}-${i++}`}>{match[5]}</u>);
    } else if (match[6]) {
      nodes.push(
        <code key={`${keyPrefix}-${i++}`}
          style={{ background: "rgba(42,18,8,0.07)", borderRadius: 4, padding: "0.1em 0.35em", fontSize: "0.92em" }}>
          {match[6]}
        </code>,
      );
    } else if (match[7]) {
      nodes.push(<em key={`${keyPrefix}-${i++}`}>{match[7]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/**
 * Render a full markdown body to React nodes.
 *
 * `skipImage` lets a page suppress a picture it already shows as its hero,
 * so the same photo is not repeated at the top of the article.
 */
export function renderMarkdown(
  body: string,
  { accent = "#6B2D8B", skipImage = "" }: { accent?: string; skipImage?: string } = {},
): React.ReactNode[] {
  return body.split(/\n\n+/).map((block, i) => {
    const imageMatch = block.trim().match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (imageMatch) {
      if (skipImage && skipImage === imageMatch[2]) return null;
      return (
        <figure key={i} style={{ margin: "2.5rem 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageMatch[2]} alt={imageMatch[1]} loading="lazy"
            style={{ width: "100%", borderRadius: 14, display: "block", boxShadow: "0 8px 28px rgba(42,18,8,0.12)" }} />
          {imageMatch[1] && (
            <figcaption style={{ marginTop: 10, fontSize: "1rem", color: "rgba(42,18,8,0.55)", textAlign: "center", fontStyle: "italic" }}>
              {imageMatch[1]}
            </figcaption>
          )}
        </figure>
      );
    }
    // Fenced code block first, so its contents are never re-read as markdown.
    if (block.startsWith("```")) {
      const code = block.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "");
      return (
        <pre key={i} style={{ margin: "2rem 0", padding: "1rem 1.25rem", background: "rgba(42,18,8,0.06)", borderRadius: 10, overflowX: "auto", fontSize: "0.95rem", lineHeight: 1.6 }}>
          <code>{code}</code>
        </pre>
      );
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(block.trim())) {
      return <hr key={i} style={{ margin: "2.5rem 0", border: 0, borderTop: "1px solid rgba(42,18,8,0.15)" }} />;
    }
    // Headings, longest marker first — testing "## " before "### " would never
    // match H3/H4 and they would fall through to the paragraph branch.
    const heading = block.match(/^(#{1,4}) ([\s\S]*)$/);
    if (heading) {
      const level = heading[1].length;
      const Tag = (`h${level}` as "h1" | "h2" | "h3" | "h4");
      return (
        <Tag key={i} style={{ fontFamily: "Cormorant Garamond, serif", fontSize: HEADING_SIZES[level], fontWeight: 400, color: "#2A1208", margin: "2.5rem 0 1rem" }}>
          {renderInline(heading[2], `h-${i}`, accent)}
        </Tag>
      );
    }
    if (/^\d+\. /.test(block)) {
      const items = block.split("\n").filter((l) => /^\d+\. /.test(l)).map((l) => l.replace(/^\d+\. /, ""));
      return <ol key={i} style={{ margin: "1.5rem 0", paddingLeft: "1.5rem", listStyle: "decimal" }}>{items.map((item, j) => <li key={j} style={{ fontSize: "1rem", lineHeight: 1.9, color: "#4A2E1A", marginBottom: "0.5rem" }}>{renderInline(item, `ol-${i}-${j}`, accent)}</li>)}</ol>;
    }
    if (block.startsWith("> ")) {
      return <blockquote key={i} style={{ margin: "2rem 0", padding: "0.5rem 1.5rem", borderLeft: `3px solid ${accent}`, fontStyle: "italic", color: "#4A2E1A", fontSize: "1.1rem", lineHeight: 1.7 }}>{renderInline(block.slice(2), `bq-${i}`, accent)}</blockquote>;
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
      return <ul key={i} style={{ margin: "1.5rem 0", paddingLeft: "1.5rem" }}>{items.map((item, j) => <li key={j} style={{ fontSize: "1rem", lineHeight: 1.9, color: "#4A2E1A", marginBottom: "0.5rem" }}>{renderInline(item, `li-${i}-${j}`, accent)}</li>)}</ul>;
    }
    return <p key={i} style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "#4A2E1A", marginBottom: "1.5rem" }}>{renderInline(block, `p-${i}`, accent)}</p>;
  });
}
