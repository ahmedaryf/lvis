import React from "react";

export default function Activities() {
  return (
    <div className='min-h-screen'>
      <h3 className='text-xl md:text-3xl text-zinc-400 text-center mb-4 uppercase body-font'>
        Aquatic Wonders
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='h-48 bg-zinc-300'></div>
        <div className='h-48 bg-zinc-300'></div>
        <div className='h-48 bg-zinc-300'></div>
      </div>
    </div>
  );
}
