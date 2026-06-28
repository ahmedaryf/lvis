"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { urlFor } from "@/sanity/lib/image";
import Motion from "./Motion";

export default function GalleryComponent({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // const images = [
  //   "/bg-images/school-1.jpg",
  //   "/bg-images/school-2.jpg",
  //   "/bg-images/school-3.jpg",
  // ];
  // const images = [
  //   { src: "/bg-images/school-1.jpg", title: "School Front View" },
  //   { src: "/bg-images/school-2.jpg", title: "Library Hallway" },
  //   { src: "/bg-images/school-3.jpg", title: "Sports Ground" },
  // ];

  // const slides = images.map((img) => ({
  //   src: img.src,
  //   title: img.title,
  // }));

  // const slides = data.images.map((src: any) => ({ src }));
  // const slides = data?.images?.map((img: any) => ({ src: urlFor(img) })) || [];
  const slides =
    data?.map((img: any) => ({
      src: urlFor(img.gallaryImages),
    })) ?? [];

  return (
    <div className='mt-6 lg:mt-12 pb-24'>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {data &&
          data.map((img: any, i: number) => {
            return (
              <div
                key={i}
                className='cursor-pointer w-full'
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}>
                <div>
                  <Motion>
                    <Image
                      src={urlFor(img.gallaryImages)}
                      width={1000}
                      height={800}
                      alt={`Image ${i + 1}`}
                      className='w-full aspect-[4/3] object-cover rounded-md hover:opacity-90 transition'
                    />
                  </Motion>
                </div>
              </div>
            );
          })}
      </div>
      {data && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Zoom, Thumbnails]}
        />
      )}
      {/* <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        render={{
          slide: ({ slide }) => (
            <div className='relative flex items-center justify-center h-full'>
              <Image
                src={slide.src}
                alt={`Image`}
                width={1000}
                height={800}
                className='max-h-full max-w-full object-contain'
              />
            </div>
          ),
        }}
      /> */}
    </div>
  );
}
