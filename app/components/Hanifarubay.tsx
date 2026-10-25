import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
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
      <h2 className='text-xl md:text-3xl text-cyan-500 text-center  uppercase body-font'>
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
      <div className='mt-4 md:mt-8 w-full flex items-center justify-center'>
        <Link
          href={"/hanifarubay"}
          className='text-sm md:text-base body-font border border-cyan-500 hover:bg-cyan-500 px-6 md:px-8  rounded-xl text-cyan-500 hover:text-white'>
          Learn more
        </Link>
      </div>
    </div>
  );
}
