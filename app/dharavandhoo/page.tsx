import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import GalleryComponent from "../components/GalleryComponent";
import { PortableText } from "next-sanity";
import BackButton from "../components/GoBack";

async function getLocationData() {
  const query = `*[_type == "location"]{
    coverPhoto,
    description,
    detailDescription,
    images,
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const location = await getLocationData();

  return (
    <div className='min-h-screen'>
      <div>
        <Image
          src={urlFor(location[0].coverPhoto)}
          width={1000}
          height={800}
          alt='cover photo'
          className='aspect-4/3 md:aspect-video object-cover w-full'
        />
      </div>
      <div className='mt-6 md:mt-8 ps-4 md:ps-12'>
        <BackButton />
      </div>

      <div className='w-full md:w-[80vw] mx-auto  mb-12 md:mb-24 mt-6 lg:mt-12'>
        <h1 className='text-xl md:text-4xl text-zinc-800 text-center md:text-start body-font my-6 md:my-12 '>
          Discover Dharavandhoo - A Beautiful Island in the Maldives
        </h1>
        <div className='mb-12 lg:mb-24 px-6 lg:px-0'>
          <div className='prose custom-prose body-font'>
            {location[0].detailDescription && (
              <PortableText value={location[0].detailDescription} />
            )}
          </div>
        </div>

        <div className='px-4 md:px-0  mx-auto'>
          <h2 className='text-xl md:text-2xl text-zinc-600 text-center  uppercase body-font mt-6 md:mt-12'>
            Photo Gallery
          </h2>
          <GalleryComponent data={location[0].images} />
        </div>
      </div>
    </div>
  );
}
