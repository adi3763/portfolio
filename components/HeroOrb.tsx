"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/ui/3d-orb"), { ssr: false });

export default function HeroOrb({ className }: { className?: string }) {
  return <Globe className={className} />;
}
