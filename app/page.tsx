import React from "react";
// import HeroSection from "./components/HeroSection";
import { client } from "@/sanity/lib/client";

import MainTitle from "./components/MainTitle";
// import SmoothScroll from "./components/SmoothScroll";
import OptimizedVideoComponent from "./components/OptimizedVideoComponent";
import PropertiesHomePage from "./components/PropertiesHomePage";

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
    <div>
      {/* <HeroSection data={heroData} /> */}
      {/* <HeroVideoComponent /> */}
      <OptimizedVideoComponent />
      <div className='min-h-screen w-full md:w-[80vw] mx-auto  mb-12 md:mb-24'>
        <MainTitle />
        <div>
          <PropertiesHomePage data={properties} />
        </div>
      </div>
    </div>
  );
}
