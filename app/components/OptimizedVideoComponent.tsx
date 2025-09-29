// "use client";
// import React from "react";

// export default function OptimizedVideoComponent() {
//   return (
//     <div>
//       <video
//         className='video-desktop w-full h-screen object-cover'
//         autoPlay
//         muted
//         loop
//         playsInline
//         poster='/images/videoCover.jpg'>
//         <source src='/videos/LVIS-heroVideo.mp4' type='video/mp4' />
//       </video>

//       <video
//         className='video-mobile w-full h-screen object-cover'
//         autoPlay
//         muted
//         loop
//         playsInline
//         poster='/images/videoCover.jpg'>
//         <source src='/videos/heroVideo.mp4' type='video/mp4' />
//       </video>

//       <style jsx>{`
//         .video-desktop {
//           display: block;
//         }
//         .video-mobile {
//           display: none;
//         }

//         @media (max-width: 768px) {
//           .video-desktop {
//             display: none;
//           }
//           .video-mobile {
//             display: block;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";

export default function OptimizedVideoComponent() {
  const [isMobile, setIsMobile] = useState<null | boolean>(null); // Start with null to avoid first render

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    // Optional: handle resizing after load
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  // Don't render anything until we know the device type
  if (isMobile === null) return null;

  return (
    <div>
      <video
        className='w-full h-screen object-cover'
        autoPlay
        muted
        loop
        playsInline
        poster='/images/videoCover.jpg'>
        <source
          src={
            isMobile
              ? "/videos/heroVideoMobile720p.mp4"
              : "/videos/heroVideo.mp4"
          }
          type='video/mp4'
        />
      </video>
    </div>
  );
}
