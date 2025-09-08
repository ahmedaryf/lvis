"use client";

import { Parallax, ParallaxBanner } from "react-scroll-parallax";

export default function ParallexComponent() {
  return (
    <div className='py-24 h-screen w-screen'>
      <ParallaxBanner
        layers={[{ image: "/bg-images/banner-background.jpg", speed: 20 }]}
        className='aspect-[16/9]'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1 className='text-9xl text-white font-extrabold tracking-wider'>
            Activities
          </h1>
        </div>
      </ParallaxBanner>
    </div>
  );
}
