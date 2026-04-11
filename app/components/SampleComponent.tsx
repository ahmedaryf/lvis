import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

export default function SampleComponent({ data }: { data: any }) {
  return (
    <div className='min-h-screen px-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {data.map((property: any, index: number) => (
          <div key={index}>
            <Image
              src={urlFor(property.coverImage)}
              width={600}
              height={600}
              alt='Image'
              className='aspect-4/3  object-cover rounded-md'
            />
            <h6 className='text-xl md:text-2xl text-center mt-4 text-zinc-400 mb-4 uppercase body-font'>
              {property.propertyName}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}
