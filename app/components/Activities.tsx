import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Motion from "./Motion";

async function getActivityData() {
  const query = `*[_type == "activities"]{
    title,
    coverPhoto,
    slug
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Activities() {
  const activities = await getActivityData();
  return (
    <div className='px-4 min-h-screen'>
      <h3 className='text-xl md:text-3xl text-zinc-400 text-center mb-4 lg:mb-8 uppercase body-font'>
        Aquatic Wonders
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {activities &&
          activities.map((activity: any, index: number) => (
            <Motion key={index}>
              <Link href={`/activities/${activity.slug.current}`}>
                <div className=' shadow rounded-md'>
                  {activity.coverPhoto && (
                    <Image
                      src={urlFor(activity.coverPhoto)}
                      width={600}
                      height={600}
                      alt='image'
                      className='aspect-4/3 object-cover rounded-md'
                    />
                  )}
                  {activity.title && (
                    <h6 className='text-base mt-2 md:text-xl text-zinc-400 text-center mb-4 uppercase body-font'>
                      {activity.title}
                    </h6>
                  )}
                </div>
              </Link>
            </Motion>
          ))}
      </div>
    </div>
  );
}
