"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scroll() {
  const containerRef = useRef(null);
  const greenRef = useRef(null);
  const redRef = useRef(null);
  const purpleRef = useRef(null);

  const lenis = useLenis();

  useEffect(() => {
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });

    ScrollTrigger.defaults({
      scroller: document.documentElement, // Lenis uses the document scroll
    });

    // GSAP ScrollTrigger + Parallax setup
    const ctx = gsap.context(() => {
      gsap.to(greenRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(redRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(purpleRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (lenis && lenis.raf) {
        gsap.ticker.remove(lenis.raf);
      }
    };
  }, [lenis]);

  return (
    <div className='min-h-screen'>
      <ReactLenis root options={{ lerp: 0.1 }}>
        <h1 className='p-24'>Scroll Page</h1>
        <button
          onClick={() => lenis?.scrollTo("#l-img", { lerp: 0.01 })}
          className='bg-red-600 text-white px-2 py-1 rounded ms-24 cursor-pointer'>
          scroll
        </button>

        <div className='h-screen'></div>
        <div className='h-screen bg-red-200'></div>

        {/* Parallax Container */}
        <div
          className='min-h-screen p-32 flex justify-between items-center'
          ref={containerRef}>
          <div
            className='w-32 h-32 bg-green-500'
            id='l-img'
            ref={greenRef}></div>
          <div className='w-32 h-32 bg-red-500' ref={redRef}></div>
          <div className='w-32 h-32 bg-purple-500' ref={purpleRef}></div>
        </div>
      </ReactLenis>
    </div>
  );
}
