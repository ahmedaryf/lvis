// "use client";
// import React, {
//   ReactNode,
//   useEffect,
//   useState,
//   createContext,
//   useContext,
// } from "react";
// import Lenis from "lenis";

// interface SmoothScrollerContextType {
//   scrollTo: (id: string) => void;
//   currentSection: string;
// }

// const smoothScrollerContext = createContext<SmoothScrollerContextType | null>(
//   null
// );

// export const useSmoothScroller = () => useContext(smoothScrollerContext);

// export default function ScrollContext({ children }: { children: ReactNode }) {
//   const [lenisRef, setLenis] = useState<any>(null);
//   const [refState, setRef] = useState<any>(null);

//   useEffect(() => {
//     const scroller = new Lenis();
//     const rf = requestAnimationFrame(function raf(time: any) {
//       scroller.raf(time);
//       requestAnimationFrame(raf);
//     });

//     setRef(rf);
//     setLenis(scroller);

//     return () => {
//       if (lenisRef) {
//         cancelAnimationFrame(refState);
//         lenisRef.destroy();
//       }
//     };
//   }, []);
//   return (
//     <smoothScrollerContext.Provider value={lenisRef}>
//       {children}
//     </smoothScrollerContext.Provider>
//   );
// }

// "use client";
// import React, {
//   ReactNode,
//   useEffect,
//   useRef,
//   createContext,
//   useContext,
// } from "react";
// import Lenis from "lenis";

// interface SmoothScrollerContextType {
//   scrollTo: (id: string) => void;
//   currentSection: string;
// }

// // Provide an empty fallback context value (customize if needed)
// const smoothScrollerContext = createContext<SmoothScrollerContextType | null>(null);

// export const useSmoothScroller = () => useContext(smoothScrollerContext);

// export default function ScrollContext({ children }: { children: ReactNode }) {
//   const lenisRef = useRef<Lenis | null>(null);
//   const rafRef = useRef<number | null>(null);

//   useEffect(() => {
//     const scroller = new Lenis();

//     function raf(time: number) {
//       scroller.raf(time);
//       rafRef.current = requestAnimationFrame(raf);
//     }

//     rafRef.current = requestAnimationFrame(raf);
//     lenisRef.current = scroller;

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       lenisRef.current?.destroy();
//     };
//   }, []);

//   // If you're just passing the Lenis instance, this works.
//   // If you need scrollTo and currentSection, update accordingly.
//   return (
//     <smoothScrollerContext.Provider value={lenisRef.current}>
//       {children}
//     </smoothScrollerContext.Provider>
//   );
// }

"use client";
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import Lenis from "lenis";

interface SmoothScrollerContextType {
  scrollTo: (id: string) => void;
  currentSection: string;
}

const smoothScrollerContext = createContext<SmoothScrollerContextType | null>(
  null
);

export const useSmoothScroller = () => useContext(smoothScrollerContext);

export default function ScrollContext({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const scroller = new Lenis();

    function raf(time: number) {
      scroller.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);
    lenisRef.current = scroller;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
    };
  }, []);

  // Custom scrollTo method using Lenis
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset: 0,
        duration: 1.2,
        easing: (x) => 1 - Math.pow(1 - x, 3), // optional easing
      });
      setCurrentSection(id); // You can update this however you track sections
    }
  };

  const contextValue: SmoothScrollerContextType = {
    scrollTo,
    currentSection,
  };

  return (
    <smoothScrollerContext.Provider value={contextValue}>
      {children}
    </smoothScrollerContext.Provider>
  );
}
