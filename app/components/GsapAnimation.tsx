"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function GsapAnimation({ children }: { children: any }) {
  const ani = useRef(null);
  useGSAP(
    () => {
      gsap.from(".anim", {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ani.current,
          start: "top 80%",
          end: "bottom 90%",
        },
      });
    },
    {
      scope: ani,
    }
  );
  return (
    <div ref={ani}>
      <div className='anim'>{children}</div>
    </div>
  );
}
