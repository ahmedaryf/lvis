import { client } from "@/sanity/lib/client";
import React from "react";

async function getProperties(slug: string) {
  const query = `*[_type == "properties" && slug.current == $slug] | order(propertyName asc){
    propertyName,
    coverImage,
    shortDescription,
    slug
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
    <div className='min-h-screen'>
      <div className='h-32'></div>
      <h1 className='text-xl md:text-3xl text-center text-zinc-400 mb-4 uppercase body-font'>
        {properties.propertyName}
      </h1>
    </div>
  );
}
