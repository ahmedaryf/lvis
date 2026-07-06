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
    <div className=' w-full '>
      <Image
        src={urlFor(activities.coverPhoto)}
        alt='Image'
        width={800}
        height={600}
        className='w-full aspect-6/3 object-cover object-top'
      />
      <div className='min-h-screen md:w-[80vw] mx-auto  mb-12 md:mb-24'>
        <h1 className='text-5xl text-center pt-24 capitalize text-zinc-500'>
          {activities.title}
        </h1>
        <BackButton />
      </div>
    </div>
  );
}
