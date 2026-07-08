"use client";
import React, { ReactNode, useRef } from "react";
import { useInView } from "motion/react";

type PropType = {
  children: ReactNode;
};

export default function Motion({ children }: PropType) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <div
        ref={ref}
        style={{
          opacity: isInView ? 1 : 0.2,
          transform: isInView ? "translateY(0px)" : "translateY(20px)",
          transition: "opacity 2s, transform 1s",
        }}>
        {children}
      </div>
    </>
  );
}
