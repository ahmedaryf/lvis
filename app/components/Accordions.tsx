"use client";
import { PortableText } from "@portabletext/react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";

export default function Accordions({ data }: any) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  function toggleAccordion(id: number) {
    setOpenAccordion((prevOpen) => (prevOpen === id ? null : id));
  }

  return (
    <div className='pb-10 pt-6  px-4 md:px-0'>
      <div className='mx-auto'>
        <h5 className='text-xl md:text-3xl text-zinc-400 text-center  uppercase body-font mb-2 md:mb-6'>
          FAQ
        </h5>
        {data &&
          data.map((item: any) => (
            <div key={item.id} className='pb-2 pt-1'>
              <button
                onClick={() => toggleAccordion(item.id)}
                className='text-sm md:text-base text-zinc-500 px-4 md:px-12 py-3 bg-black/5  w-full text-start rounded-md cursor-pointer body-font'>
                {item.question} {item.name}
              </button>
              <Collapse isOpened={openAccordion === item.id}>
                <div className='text-sm md:text-base prose dark:prose-invert text-zinc-500  custom-prose text-justify px-4 md:px-12 bg-zinc-50 py-4 rounded-b-md body-font'>
                  {item.answer && <PortableText value={item.answer} />}
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
}
