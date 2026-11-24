import Link from "next/link";
import type { ServiceBadge } from "./serviceContent";

// Accreditation badge with its holder and a link to the public registry entry.
export default function BadgeBand({ badge }: { badge: ServiceBadge }) {
  return (
    <section className="py-16 px-6" style={{ background: "#FFFFFF" }}>
      <div className="text-center">
        <img src={badge.src} alt={badge.alt} width={160} height={160} loading="lazy" decoding="async" className="mx-auto" />
        <p className="mt-5 text-sm font-medium" style={{ color: "#4A2E1A" }}>{badge.caption}</p>
        {badge.holder && (
          <p className="mt-2 text-sm" style={{ color: "#4A2E1A" }}>
            Yoga Alliance provider:{" "}
            {badge.holderHref
              ? <Link href={badge.holderHref} className="underline" style={{ color: "#6B2D8B" }}>{badge.holder}</Link>
              : badge.holder}
          </p>
        )}
        {badge.verifyHref && (
          <p className="mt-2 text-sm">
            <a href={badge.verifyHref} target="_blank" rel="noopener" className="underline" style={{ color: "#6B2D8B" }}>
              Verify on the Yoga Alliance directory ↗
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
