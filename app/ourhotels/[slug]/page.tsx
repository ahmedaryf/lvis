import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

async function getProperties(slug: string) {
  const query = `*[_type == "properties" && slug.current == $slug] | order(propertyName asc){
    propertyName,
    coverImage,
    shortDescription,
    slug
  }[0]`;
  const data = await client.fetch(
    query,
    { slug },
    { next: { revalidate: 60 } },
  );
  return data;
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const properties = await getProperties(slug);

  return (
    <div className='min-h-screen'>
      <div className=' relative w-full'>
        <div className='absolute left-0 top-0 w-full h-full bg-black/50'></div>
        <Image
          src={urlFor(properties.coverImage)}
          alt='Cover Image'
          width={1000}
          height={800}
          className='w-full h-screen lg:h-full aspect-video object-cover'
        />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
          <h1 className=' text-4xl md:text-8xl text-center text-zinc-300 mb-4 uppercase body-font font-semibold'>
            {properties.propertyName}
          </h1>
        </div>
      </div>
      <div className='min-h-screen'></div>
    </div>
  );
}
