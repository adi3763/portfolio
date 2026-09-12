"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

const lenisOptions: LenisOptions = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
};

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
