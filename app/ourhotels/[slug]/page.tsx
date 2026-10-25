import { DialogComponent } from "@/app/components/DialogComponent";
import { DialogComponentRoomType } from "@/app/components/DialogComponentRoomType";
import GalleryComponent from "@/app/components/GalleryComponent";
import BackButton from "@/app/components/GoBack";
import InquiryForm from "@/app/components/InquiryForm";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

async function getProperties(slug: string) {
  const query = `*[_type == "properties" && slug.current == $slug] | order(propertyName asc){
    propertyName,
    coverImage,
    shortDescription,
    slug,
    images,
    propertyDetails,
    roomTypes[]{
      roomType,
      roomCoverPhoto,
      roomPhotos[]
    }
  }[0]`;
  const data = await client.fetch(
    query,
    { slug },
    { next: { revalidate: 60 } },
  );
  return data;
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const properties = await getProperties(slug);

  return (
    <div className='min-h-screen relative'>
      <div className=' relative w-full'>
        <div className='absolute left-0 top-0 w-full h-full bg-black/20'></div>
        <Image
          src={urlFor(properties.coverImage)}
          alt='Cover Image'
          width={1000}
          height={800}
          className='w-full h-full aspect-4/3 md:aspect-video object-cover'
        />
        <div className=' absolute top-2/3 lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
          <h1 className=' text-4xl md:text-8xl text-center text-white/30 mb-4 body-font '>
            {properties.propertyName}
          </h1>
        </div>
      </div>
      <div className='pt-4 px-4 lg:pt-8 lg:px-8 flex justify-between  md:sticky md:top-24 z-10'>
        <BackButton />
        <div className=''>
          <DialogComponent>
            <InquiryForm />
          </DialogComponent>
        </div>
      </div>
      <div className='w-full md:w-[80vw] mx-auto  mb-12 md:mb-24 mt-6 lg:mt-12'>
        <div className='mb-12 lg:mb-24 px-6 lg:px-0'>
          <div className='prose custom-prose body-font'>
            {properties.propertyDetails && (
              <PortableText value={properties.propertyDetails} />
            )}
          </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-0'>
          {properties.roomTypes.map((room: any, index: any) => (
            <div key={index}>
              <div>
                <Image
                  src={urlFor(room.roomCoverPhoto)}
                  width={600}
                  height={500}
                  alt='Cover Photo'
                  className='aspect-4/3 object-cover rounded-md'
                />
              </div>
              <h5 className='text-base md:text-xl text-zinc-400 body-font text-center mt-2'>
                {room.roomType}
              </h5>
            </div>
          ))}
        </div>
        {/* <DialogComponentRoomType data={properties} /> */}

        <div className='px-6 lg:px-0'>
          <h5 className='text-xl md:text-2xl text-zinc-600 text-center  uppercase body-font mt-12 md:mt-24'>
            Photo Gallery
          </h5>
          <GalleryComponent data={properties.images} />
        </div>
      </div>
    </div>
  );
}
