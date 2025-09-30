"use client";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PropertiesHomePage({ data }: { data: any }) {
  const [domReady, setDomReady] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDomReady(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // useGSAP(
  //   () => {
  //     if (!domReady) return;

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: mainRef.current,
  //         start: "top 50%",
  //         end: "70% 10%",
  //         toggleActions: "play reverse play reverse",
  //       },
  //     });

  //     tl.fromTo(
  //       ".image",
  //       {
  //         clipPath: "inset(25%)",
  //       },
  //       {
  //         clipPath: "inset(0%)",
  //         opacity: 1,
  //         duration: 2,
  //         ease: "power2.out",
  //       }
  //     );
  //     tl.from(".text", { opacity: 0, duration: 0.5, y: 20 }, "-=0.6");
  //   },
  //   { scope: mainRef, dependencies: [domReady] }
  // );
  useGSAP(
    () => {
      if (!domReady) return;

      const items = gsap.utils.toArray(".property-item") as HTMLElement[];

      items.forEach((item) => {
        const image = item.querySelector(".image") as HTMLElement | null;
        const text = item.querySelector(".text") as HTMLElement | null;

        if (!image || !text) return;

        const split = new SplitText(text, {
          type: "lines",
          linesClass: "lineChild",
          mask: "lines",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          image,
          {
            clipPath: "inset(25%)",
            opacity: 0.6,
          },
          {
            clipPath: "inset(0%)",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          }
        );

        tl.from(
          split.lines,
          {
            opacity: 0.5,
            y: 100,
            duration: 2,
            ease: "power2.inOut",
            stagger: 0.06,
          },
          "-= 2"
        );
      });
    },
    { scope: mainRef, dependencies: [domReady] }
  );

  return (
    <div className=' py-6 md:p-24' ref={mainRef}>
      {data.slice(0, 3).map((item: any, index: number) => (
        <div
          key={index}
          className={`property-item flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center mb-24 md:mb-52 ${
            index === 1 ? "md:flex-row-reverse" : ""
          }`}>
          <div className='w-full md:w-2/3 relative'>
            <Image
              src={urlFor(item.coverImage)}
              width={800}
              height={600}
              alt='Image'
              className='w-full h-full aspect-[4/3] md:aspect-[16/9] object-cover image md:rounded-xl '
            />
          </div>
          <div className='text-center w-full md:w-1/3 px-6 text leading-8'>
            <h5 className='text-xl md:text-3xl text-zinc-400 mb-4 uppercase body-font'>
              {item.propertyName}
            </h5>
            <h5 className='text-zinc-500 body-font'>{item.shortDescription}</h5>

            <button className='border border-zinc-400 px-4 py-1 text-xs text-zinc-400 mt-4 rounded-xl body-font hover:bg-zinc-400 hover:text-white cursor-pointer duration-300 tracking-wider'>
              Learn more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
