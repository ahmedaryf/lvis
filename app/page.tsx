import React from "react";
// import HeroSection from "./components/HeroSection";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import HeroVideoComponent from "./components/HeroVideoComponent";
import SmoothScroll from "./components/SmoothScroll";
import MainTitle from "./components/MainTitle";

export const revalidate = 60;

// async function getHeroData() {
//   const query = `*[_type == "hero"]{
//   image,
//   title
//   }`;
//   const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
//   return data;
// }

async function getProperties() {
  const query = `*[_type == "properties"] | order(propertyName asc){
    propertyName,
    coverImage,
    shortDescription
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  // const heroData = await getHeroData();
  const properties = await getProperties();

  return (
    <SmoothScroll>
      <div>
        {/* <HeroSection data={heroData} /> */}
        <HeroVideoComponent />
        <div className='min-h-screen w-full md:w-[80vw] mx-auto  mb-12 md:mb-24'>
          <MainTitle />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-24 px-6 md:px-24'>
            {properties.map((property: any, index: number) => (
              <div
                key={index}
                className='bg-gray-100 flex flex-col gap-4 justify-between rounded'>
                <div className=' '>
                  <div className=' '>
                    {
                      <Image
                        src={urlFor(property.coverImage)}
                        alt='Cover Image'
                        width={200}
                        height={200}
                        className='aspect-[16/9] object-cover w-full rounded-t'
                      />
                    }
                  </div>
                  <div className='p-2 md:p-4 '>
                    <h2 className='text-2xl md:text-3xl font-thin text-center mb-2 mt-2'>
                      {property.propertyName}
                    </h2>
                    <h6 className='text-sm'>{property.shortDescription}</h6>
                  </div>
                </div>
                <div className=''>
                  <button className='bg-gray-500 px-2 py-1 w-full text-white mt-auto'>
                    Learn more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
