import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Motion from "./Motion";
import { FaLongArrowAltRight } from "react-icons/fa";

async function getActivityData() {
  const query = `*[_type == "activities"]{
    title,
    coverPhoto,
    slug,
    shortDescription
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Activities() {
  const activities = await getActivityData();
  return (
    <div className='px-4'>
      <h3 className='text-xl md:text-3xl text-cyan-600/60 text-center mb-4 lg:mb-8 uppercase body-font'>
        Fun Adventures
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {activities &&
          activities.map((activity: any, index: number) => (
            <Motion key={index}>
              <Link
                href={`/activities/${activity.slug.current}`}
                className='hover:opacity-90'>
                <div className=' shadow rounded-md pb-4'>
                  {activity.coverPhoto && (
                    <Image
                      src={urlFor(activity.coverPhoto)}
                      width={600}
                      height={600}
                      alt='image'
                      className='aspect-4/3 object-cover rounded-t-md'
                    />
                  )}

                  <div className='px-4 mb-4'>
                    {activity.title && (
                      <div className=''>
                        <h6 className='text-base mt-2 md:text-base text-cyan-500 font-semibold text-center mb-4 uppercase body-font'>
                          {activity.title}
                        </h6>
                      </div>
                    )}
                    <div>
                      <p className='text-sm md:text-base text-zinc-500 body-font line-clamp-2'>
                        {activity.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 justify-end px-2 cursor-pointer'>
                    <p className='text-sm text-cyan-500 hover:text-cyan-400 body-font'>
                      Learn more
                    </p>
                    <FaLongArrowAltRight className='text-sm text-cyan-500 hover:text-cyan-400 body-font' />
                  </div>
                </div>
              </Link>
            </Motion>
          ))}
      </div>
    </div>
  );
}
