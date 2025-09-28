"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function MainTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = SplitText.create(".splitText", {
        type: "chars, words, lines",
        mask: "lines",
      });
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: ".splitText",
          start: "top 70%",
          end: "top bottom",
          toggleActions: "play none none reverse",
        },
        y: 200,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );
  return (
    <div ref={containerRef}>
      <h1 className='text-3xl md:text-6xl font-thin text-center mt-12 md:mt-24 pt-12 splitText'>
        LVIS Hotels Maldives
      </h1>
    </div>
  );
}
