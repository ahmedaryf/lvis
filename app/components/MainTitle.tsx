// "use client";
// import React, { useRef } from "react";
// import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(SplitText, ScrollTrigger);

// export default function MainTitle() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   useGSAP(
//     () => {
//       const split = SplitText.create(".splitText", {
//         type: "chars, words, lines",
//         mask: "lines",
//       });
//       gsap.from(split.chars, {
//         scrollTrigger: {
//           trigger: ".splitText",
//           start: "top 70%",
//           end: "top bottom",
//           toggleActions: "play none none reverse",
//         },
//         y: 200,
//         duration: 0.3,
//         stagger: 0.03,
//         ease: "power2.out",
//       });
//     },
//     { scope: containerRef }
//   );
//   return (
//     <div ref={containerRef}>
//       <h1 className='text-3xl md:text-6xl font-semibold text-center mt-12 md:mt-24 pt-12 splitText'>
//         LVIS Hotels Maldives
//       </h1>
//     </div>
//   );
// }

"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function MainTitle() {
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
    },
    { scope: containerRef, dependencies: [domReady] }
  );

  return (
    <div ref={containerRef} className='flex flex-col'>
      <h1 className='text-4xl md:text-8xl text-zinc-400 font-bold text-center mt-6 md:mt-24 pt-12 splitText uppercase tracking-wider '>
        LVIS Hotels
      </h1>
      <h6 className='text-xl md:text-4xl text-zinc-300  uppercase splitText text-center body-font'>
        <span className='tracking-[1.2rem] md:tracking-[3.6rem] inline-block'>
          Maldive
        </span>
        <span className='inline-block'>s</span>
      </h6>
    </div>
  );
}
