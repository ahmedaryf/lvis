import React from "react";
import HeroSection from "./components/HeroSection";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

async function getHeroData() {
  const query = `*[_type == "hero"]{
  image,
  title
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const heroData = await getHeroData();
  return (
    <div>
      <HeroSection data={heroData} />
      <div className='h-screen'>
        <h1 className='text-3xl md:text-6xl font-bold text-center mt-12'>
          Welcome to LVIS Hotels
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-6 md:px-24'>
          <div>
            <h2 className='text-3xl md:text-4xl font-thin text-center mb-2'>
              Blencura
            </h2>
            <div className='bg-amber-200 h-32'></div>
          </div>
          <div>
            <h2 className='text-3xl md:text-4xl font-thin text-center mb-2'>
              Pool
            </h2>
            <div className='bg-blue-200 h-32'></div>
          </div>
          <div>
            <h2 className='text-3xl md:text-4xl font-thin text-center mb-2'>
              Village
            </h2>
            <div className='bg-green-200 h-32'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
