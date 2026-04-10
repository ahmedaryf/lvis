"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function MainTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDomReady(true), 100); // Adjust as needed
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      if (!domReady) return;

      const split = SplitText.create(".splitText", {
        type: "chars, words, lines",
        mask: "lines",
      });

      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: ".splitText",
          start: "top 70%",
          end: "top bottom",
          toggleActions: "play none none reverse",
        },
        y: 200,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".container1", {
        scrollTrigger: {
          trigger: ".container1",
          start: "top 100%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [domReady] },
  );

  return (
    <div ref={containerRef} className='flex flex-col h-[50vh] lg:h-[70vh]'>
      <h1 className='text-4xl md:text-8xl text-zinc-400 font-semibold text-center mt-6 md:mt-24 pt-12 splitText uppercase tracking-wider '>
        LVIS Hotels
      </h1>
      <h6 className='text-base md:text-3xl text-zinc-300  uppercase splitText text-center body-font'>
        <span className='tracking-[0.4rem] md:tracking-[1.6rem] inline-block'>
          Dharavandhoo
        </span>
        {/* <span className='inline-block'>s</span> */}
      </h6>

      <div ref={containerRef} className='px-4 lg:px-12 my-6 container1'>
        <p className='text-zinc-400 body-font text-justify introText lg:text-center leading-6 lg:leading-8 text-sm lg:text-lg'>
          {text}
        </p>
      </div>
    </div>
  );
}
