import type { OpenNextConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

// Pages are ISR (`export const revalidate`). With the previous "dummy"
// incremental cache nothing was ever stored, so every single request
// re-rendered the whole page and re-ran its Supabase queries — which is what
// exhausted the Worker CPU budget (Cloudflare error 1102).
//
// KV now holds the rendered pages, and the regional Cache API layer in front of
// it keeps repeat hits inside one data centre from even reaching KV.
const incrementalCache = withRegionalCache(kvIncrementalCache, { mode: "short-lived" });

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: () => incrementalCache,
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: () => incrementalCache,
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
