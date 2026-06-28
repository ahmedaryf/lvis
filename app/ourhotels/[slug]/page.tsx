import GalleryComponent from "@/app/components/GalleryComponent";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

async function getProperties(slug: string) {
  const query = `*[_type == "properties" && slug.current == $slug] | order(propertyName asc){
    propertyName,
    coverImage,
    shortDescription,
    slug,
    images,
    propertyDetails
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
    <div className='min-h-screen '>
      <div className=' relative w-full'>
        <div className='absolute left-0 top-0 w-full h-full bg-black/20'></div>
        <Image
          src={urlFor(properties.coverImage)}
          alt='Cover Image'
          width={1000}
          height={800}
          className='w-full h-full aspect-video object-cover'
        />
        <div className=' absolute top-2/3 lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
          <h1 className=' text-3xl md:text-8xl text-center text-white mb-4 uppercase body-font font-semibold'>
            {properties.propertyName}
          </h1>
        </div>
      </div>
      <div className='w-full md:w-[80vw] mx-auto  mb-12 md:mb-24 mt-12 lg:mt-24'>
        <div className='mb-12 lg:mb-24 px-6 lg:px-0'>
          <div className='prose custom-prose body-font'>
            {properties.propertyDetails && (
              <PortableText value={properties.propertyDetails} />
            )}
          </div>
        </div>

        <div className='min-h-screen px-6 lg:px-0'>
          <GalleryComponent data={properties.images} />
        </div>
      </div>
    </div>
  );
}
