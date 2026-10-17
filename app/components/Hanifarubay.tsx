import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

async function getHanifarubayData() {
  const query = `*[_type == "hanifarubay"]{
    hanifarubayTitle,
    subTitle,
    description,
    coverPhoto
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function HanifarubayComponent() {
  const hanifarubay = await getHanifarubayData();

  return (
    <div className='px-4'>
      <h2 className='text-xl md:text-3xl text-zinc-400 text-center  uppercase body-font'>
        {hanifarubay[0].hanifarubayTitle}
      </h2>
      <h5 className='text-sm md:text-xl text-black/30 text-center mb-4 lg:mb-6 body-font'>
        {hanifarubay[0].subTitle}
      </h5>
      <div className=' w-full'>
        <Image
          src={urlFor(hanifarubay[0].coverPhoto)}
          width={1000}
          height={800}
          alt='Cover Photo'
          className='aspect-4/3 md:aspect-video object-cover mx-auto rounded-md'
        />
      </div>
      <div className='prose custom-prose body-font mt-4 text-zinc-500 md:px-24'>
        {hanifarubay[0].description && (
          <PortableText value={hanifarubay[0].description} />
        )}
      </div>
    </div>
  );
}
