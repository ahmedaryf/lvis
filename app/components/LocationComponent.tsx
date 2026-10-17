import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getLocationData() {
  const query = `*[_type == "location"]{
    locationTitle,
    subTitle,
    description,
    coverPhoto,
    subTitleBlock
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function LocationComponent() {
  const location = await getLocationData();

  return (
    <div className='px-4'>
      <h2 className='text-xl md:text-3xl text-zinc-400 text-center  uppercase body-font'>
        {location[0].locationTitle}
      </h2>
      <h5 className='text-sm md:text-xl text-black/30 text-center mb-4 lg:mb-6 body-font'>
        {location[0].subTitle}
      </h5>

      <div className=' w-full'>
        <Image
          src={urlFor(location[0].coverPhoto)}
          width={1000}
          height={800}
          alt='Cover Photo'
          className='aspect-4/3 md:aspect-video object-cover mx-auto rounded-md'
        />
      </div>
      <div className='prose custom-prose body-font mt-4 text-zinc-500 md:px-24'>
        {location[0].description && (
          <PortableText value={location[0].description} />
        )}
      </div>
      <div className='mt-4 md:mt-8 w-full flex items-center justify-center'>
        <Link
          href={"/dharavandhoo"}
          className='text-sm md:text-base body-font border-2 border-zinc-200 hover:bg-zinc-400 px-6 md:px-8  rounded-xl text-zinc-400 hover:text-white'>
          Explore Dharavandhoo
        </Link>
      </div>
    </div>
  );
}
