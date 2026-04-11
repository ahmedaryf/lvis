import React from "react";

export default function DiningComponent() {
  return (
    <div className='min-h-screen'>
      <h1 className='text-xl md:text-3xl text-center mt-4 text-zinc-400 mb-6 uppercase body-font'>
        The Flavors of LVIS
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='h-56 bg-zinc-400'></div>
        <div className='h-56 bg-zinc-400'></div>
        <div className='h-56 bg-zinc-400'></div>
        <div className='h-56 bg-zinc-400'></div>
      </div>
    </div>
  );
}
