"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const hearts = [
  { id: 1, src: "/assets/final-heart-1.png", alt: "Your cause" },
  { id: 2, src: "/assets/final-heart-2.png", alt: "Medical" },
  { id: 3, src: "/assets/final-heart-3.png", alt: "Emergency" },
  { id: 4, src: "/assets/final-heart-4.png", alt: "Education" },
  { id: 5, src: "/assets/final-heart-5.png", alt: "Animal" },
  { id: 6, src: "/assets/final-heart-6.png", alt: "Business" },
];

export function MobileHeartSlider() {
  const [activeHeartIndex, setActiveHeartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeartIndex((prev) => (prev + 1) % hearts.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="md:hidden w-full h-[250px] relative -mt-6 -mb-4 overflow-hidden">

      {hearts.map((heart, idx) => {
        const isActive = idx === activeHeartIndex;
        const isPrev = idx === (activeHeartIndex - 1 + hearts.length) % hearts.length;

        return (
          <div 
            key={heart.id}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
              ${isActive 
                ? "translate-x-0 opacity-100 scale-100" 
                : (isPrev 
                   ? "-translate-x-full opacity-0 scale-90" 
                   : "translate-x-full opacity-0 scale-90")
              }
            `}
          >
            <div className="relative w-[235px] h-[235px] flex items-center justify-center">
              <Image
                src={heart.src}
                alt={heart.alt}
                width={235}
                height={235}
                className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.22)]"
                priority
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}






