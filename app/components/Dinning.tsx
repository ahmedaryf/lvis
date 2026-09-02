import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Motion from "./Motion";

async function getDinningData() {
  const query = `*[_type == "dinning"]{
    title,
    coverPhoto,
    slug
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Dinning() {
  const dinnings = await getDinningData();
  return (
    <div className='px-4 min-h-screen'>
      <h3 className='text-xl md:text-3xl text-zinc-400 text-center mb-4 lg:mb-8 uppercase body-font'>
        The Flavors of LVIS
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {dinnings &&
          dinnings.map((dinning: any, index: number) => (
            <Motion key={index}>
              <Link href={`/dinning/${dinning.slug.current}`}>
                <div className=' shadow rounded-md pb-1'>
                  {dinning.coverPhoto && (
                    <Image
                      src={urlFor(dinning.coverPhoto)}
                      width={600}
                      height={600}
                      alt='image'
                      className='aspect-4/3 object-cover rounded-md'
                    />
                  )}
                  {dinning.title && (
                    <h6 className='text-sm mt-2 md:text-base text-zinc-400 text-center mb-4 uppercase body-font'>
                      {dinning.title}
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
