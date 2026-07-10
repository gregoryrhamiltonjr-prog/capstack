"use client";

import Spline from "@splinetool/react-spline";

export default function SplineBackground({ scene, className = "" }: { scene: string; className?: string }) {
  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      <Spline scene={scene} />
    </div>
  );
}
