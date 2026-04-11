import React from "react";
// import HeroSection from "./components/HeroSection";
import { client } from "@/sanity/lib/client";

import MainTitle from "./components/MainTitle";
// import SmoothScroll from "./components/SmoothScroll";
// import OptimizedVideoComponent from "./components/OptimizedVideoComponent";
import PropertiesHomePage from "./components/PropertiesHomePage";
import HeroSection from "./components/HeroSection";
import Activities from "./components/Activities";
import SampleComponent from "./components/SampleComponent";
import DiningComponent from "./components/DiningComponent";

export const revalidate = 60;

async function getHeroData() {
  const query = `*[_type == "hero"]{
  image,
  title
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getProperties() {
  const query = `*[_type == "properties"] | order(propertyName asc){
    propertyName,
    coverImage,
    shortDescription
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getAboutusData() {
  const query = `*[_type == "aboutus"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  // const heroData = await getHeroData();
  const properties = await getProperties();
  const heroData = await getHeroData();
  const aboutus = await getAboutusData();

  return (
    <div>
      <HeroSection data={heroData} />
      {/* <HeroVideoComponent /> */}
      {/* <OptimizedVideoComponent /> */}

      <div className='min-h-screen w-full md:w-[80vw] mx-auto  mb-12 md:mb-24'>
        <MainTitle text={aboutus[0].intro} />
        <div>
          <SampleComponent data={properties} />
        </div>
        <div>
          <Activities />
        </div>
        <div>
          <DiningComponent />
        </div>
        <div className='border-t-2'>
          <h3 className='text-xl lg:text-5xl font-bold text-red-700 text-center'>
            Old Page
          </h3>
          <PropertiesHomePage data={properties} />
        </div>
      </div>
    </div>
  );
}
