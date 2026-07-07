import BackButton from "@/app/components/GoBack";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

export async function getActivities(slug: string) {
  const query = `*[_type == "activities" && slug.current == $slug][0]{
    title,
    coverPhoto
    }`;
  const data = await client.fetch(
    query,
    { slug },
    { next: { revalidate: 60 } },
  );
  return data;
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const activities = await getActivities(slug);

  return (
    <div className='w-full mb-12 md:mb-24'>
      <div className=''>
        {/* <div className='w-full h-full bg-black/10 absolute left-0 top-0'></div> */}
        <Image
          src={urlFor(activities.coverPhoto)}
          alt='Image'
          width={1000}
          height={800}
          className='aspect-6/3 lg:aspect-5/2 object-cover object-center overflow-hidden w-full '
        />
        <div className='pt-4 px-4 lg:px-8 lg:pt-8'>
          <BackButton />
        </div>
        <div className=''>
          <h1 className='text-2xl lg:text-7xl body-font text-center capitalize text-zinc-500'>
            {activities.title}
          </h1>
        </div>
      </div>

      <div className='px-4 lg:px-0 min-h-screen md:w-[80vw] mx-auto'></div>
    </div>
  );
}
