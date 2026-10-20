import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

async function getPromotionsData() {
  const query = `*[_type == "promotions"]{
        coverPhoto
    }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });

  return data;
}

export default async function page() {
  const promotions = await getPromotionsData();

  return (
    <div className=''>
      <div className=' overflow-hidden w-full'>
        <Image
          src={urlFor(promotions[0].coverPhoto)}
          width={1000}
          height={800}
          alt='Cover Photo'
          className='aspect-4/3 md:aspect-video object-cover w-full h-[70vh]'
        />
      </div>
      <h1 className='pt-12 md:pt-24 text-xl md:text-3xl text-zinc-400 text-center mb-4 lg:mb-8 uppercase body-font'>
        Promotions
      </h1>
    </div>
  );
}
