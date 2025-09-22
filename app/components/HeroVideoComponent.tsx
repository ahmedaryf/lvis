import React from "react";

export default function HeroVideoComponent() {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster='/images/videoCover.jpg'
        className='w-full h-screen object-cover'>
        <source src='/videos/heroVideo.mp4' type='video/mp4' />
      </video>
    </div>
  );
}
