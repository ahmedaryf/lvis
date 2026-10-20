import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

export default function ActivityItem({ data }: any) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      {data?.map((activity: any, index: number) => {
        return (
          <div key={index} className='bg-gray-50 rounded-xl shadow-2xl'>
            <div>
              <Image
                src={urlFor(activity.itemPhoto)}
                width={600}
                height={400}
                alt='Item Photo'
                className='aspect-4/3 object-cover rounded-t-xl w-full'
              />
            </div>
            <div className='px-4 py-4'>
              <p className='text-center text-base body-font text-cyan-600'>
                {activity.itemName}
              </p>
              <div className='flex justify-around mt-4'>
                <div className='flex flex-col gap-0 items-center'>
                  <p className='text-cyan-600/70 body-font'>Duration</p>
                  <p className='text-cyan-600/70 body-font text-sm'>
                    {activity.itemDuration}
                  </p>
                </div>
                <div className='flex flex-col gap-0 items-center'>
                  <p className='text-cyan-600/70 body-font'>Minimum</p>
                  <p className='text-cyan-600/70 body-font text-sm'>
                    {activity.itemMinimumPax} Pax
                  </p>
                </div>
              </div>
              <div className=' flex items-center justify-center gap-2 bg-cyan-500 mt-6 rounded'>
                <p className='text-zinc-100 body-font'>Price:</p>
                <p className='text-zinc-100 body-font text-sm'>
                  ${activity.itemPrice}/- per person
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
