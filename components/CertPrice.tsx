"use client";

import { useEffect, useState } from "react";

type LevelPrice = { price?: string; note?: string };
type PricingData = { soundCert?: { level1?: LevelPrice; level2?: LevelPrice } };

// Module-level cache so both cards share a single fetch.
let cache: PricingData | null = null;
let inflight: Promise<PricingData> | null = null;

function loadPricing(): Promise<PricingData> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetch("/api/pricing")
    .then((r) => (r.ok ? r.json() : { data: {} }))
    .then((j) => {
      cache = (j?.data ?? {}) as PricingData;
      return cache;
    })
    .catch(() => {
      cache = {};
      return cache;
    });
  return inflight;
}

export default function CertPrice({ level, color }: { level: "level1" | "level2"; color: string }) {
  const [data, setData] = useState<LevelPrice | null>(cache?.soundCert?.[level] ?? null);
  const [loaded, setLoaded] = useState(cache != null);

  useEffect(() => {
    let alive = true;
    loadPricing().then((p) => {
      if (!alive) return;
      setData(p.soundCert?.[level] ?? {});
      setLoaded(true);
    });
    return () => { alive = false; };
  }, [level]);

  if (!loaded) return null;

  const price = data?.price?.trim();
  const note = data?.note?.trim();

  return (
    <div className="mb-6 relative">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color }}>
          {price || "Price on request"}
        </span>
      </div>
      <p className="text-xs mt-1" style={{ color: "#7A5840" }}>
        {note || "Message us on WhatsApp for current rates"}
      </p>
    </div>
  );
}
