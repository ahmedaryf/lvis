import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

async function getActivityData() {
  const query = `*[_type == "activities"]`;
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
        {activities.map((activity: any, index: number) => (
          <div key={index} className=' shadow-xl rounded-md'>
            <Image
              src={urlFor(activity.coverPhoto)}
              width={600}
              height={600}
              alt='image'
              className='aspect-4/3 object-cover rounded-md'
            />
            <h6 className='text-base mt-2 md:text-xl text-zinc-400 text-center mb-4 uppercase body-font'>
              {activity.title}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}
