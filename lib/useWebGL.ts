"use client";
import { useEffect, useState } from "react";

/**
 * Probes whether the browser can actually create a WebGL context.
 * react-three-fiber's <Canvas> throws a runtime error when it can't
 * (e.g. WebGL disabled, hardware acceleration off, software-blocked GPUs),
 * so callers gate the 3-D scene on this and render a static fallback instead.
 *
 * Returns: null while probing (first client render), then true / false.
 */
export function useWebGLAvailable(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let supported = false;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      supported = !!gl;
      // Release the probe context so it doesn't count against the browser's
      // (small) per-page WebGL context budget before the real Canvas mounts.
      const lose = (gl as WebGLRenderingContext | null)
        ?.getExtension?.("WEBGL_lose_context");
      lose?.loseContext?.();
    } catch {
      supported = false;
    }
    setOk(supported);
  }, []);

  return ok;
}
