"use client";
import React, { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    ScrollTrigger.defaults({
      scroller: document.documentElement, // Lenis scrolls the document
    });

    return () => {
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      {children}
    </ReactLenis>
  );
}
