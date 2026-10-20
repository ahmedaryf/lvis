import React from "react";
// import HeroSection from "./components/HeroSection";
import { client } from "@/sanity/lib/client";

import MainTitle from "./components/MainTitle";
// import SmoothScroll from "./components/SmoothScroll";
// import OptimizedVideoComponent from "./components/OptimizedVideoComponent";
import PropertiesHomePage from "./components/PropertiesHomePage";
// import HeroSection from "./components/HeroSection";
import Activities from "./components/Activities";
import Dinning from "./components/Dinning";
import LocationComponent from "./components/LocationComponent";
import HanifarubayComponent from "./components/Hanifarubay";
import Accordions from "./components/Accordions";
import OptimizedVideoComponent from "./components/OptimizedVideoComponent";

export const revalidate = 60;

// async function getHeroData() {
//   const query = `*[_type == "hero"] | order(id asc){
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
    shortDescription,
    slug
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getAboutusData() {
  const query = `*[_type == "aboutus"]{
    intro
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getFaqData() {
  const query = `*[_type == "accordions"]{
    id,
    question, answer
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  // const heroData = await getHeroData();
  const properties = await getProperties();
  // const heroData = await getHeroData();
  const aboutus = await getAboutusData();
  const faqData = await getFaqData();

  return (
    <div>
      {/* <HeroSection data={heroData} /> */}
      {/* <HeroVideoComponent /> */}
      <OptimizedVideoComponent />

      <div className='min-h-screen w-full md:w-[80vw] mx-auto  mb-12 md:mb-24'>
        <MainTitle text={aboutus[0].intro} />
        <div className=''>
          <PropertiesHomePage data={properties} />
        </div>
        <div className=' mb-24 md:mb-32'>
          <Activities />
        </div>
        <div className=' mb-24 md:mb-32'>
          <Dinning />
        </div>
        <div className=' mb-24 md:mb-32'>
          <HanifarubayComponent />
        </div>
        <div className=' mb-24'>
          <LocationComponent />
        </div>

        <div>
          <Accordions data={faqData} />
        </div>
      </div>
    </div>
  );
}
