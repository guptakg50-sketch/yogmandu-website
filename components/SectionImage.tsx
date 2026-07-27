import { getSectionImage } from "@/lib/pageContent";

/**
 * Optional picture under a section heading.
 *
 * Every "eyebrow + heading" section on the site has one of these slots. The
 * client fills the slot in Admin → Page Content → Section images; while it is
 * empty this renders nothing at all, so pages look exactly as they do today.
 *
 * Any image size works: the band caps the width, scales the height
 * proportionally, and never lets the image push the page wider than the screen.
 */
export default async function SectionImage({
  slot,
  maxWidth = 900,
  className = "",
}: {
  slot: string;
  maxWidth?: number;
  className?: string;
}) {
  const image = await getSectionImage(slot).catch(() => null);
  if (!image) return null;

  return (
    <div className={className} style={{ width: "100%", padding: "0 0 2.5rem" }}>
      <img
        src={image.image}
        alt={image.alt || ""}
        loading="lazy"
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          maxWidth,
          height: "auto",
          margin: "0 auto",
          borderRadius: "1rem",
        }}
      />
    </div>
  );
}
