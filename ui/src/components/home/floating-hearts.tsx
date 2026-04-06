"use client";

import Image from "next/image";

const hearts = [
  { src: "/assets/final-heart-1.png", alt: "Your cause", className: "top-[10%] left-[5%] w-16 md:w-24 animate-[float_6s_ease-in-out_infinite]" },
  { src: "/assets/final-heart-2.png", alt: "Medical", className: "top-[5%] left-[25%] w-14 md:w-20 animate-[float_7s_ease-in-out_0.5s_infinite]" },
  { src: "/assets/final-heart-3.png", alt: "Emergency", className: "top-[15%] right-[25%] w-14 md:w-20 animate-[float_8s_ease-in-out_1s_infinite]" },
  { src: "/assets/final-heart-4.png", alt: "Education", className: "top-[8%] right-[5%] w-16 md:w-24 animate-[float_6.5s_ease-in-out_1.5s_infinite]" },
  { src: "/assets/final-heart-5.png", alt: "Animal", className: "top-[30%] left-[12%] w-12 md:w-16 animate-[float_7.5s_ease-in-out_2s_infinite]" },
  { src: "/assets/final-heart-6.png", alt: "Business", className: "top-[28%] right-[10%] w-12 md:w-16 animate-[float_8.5s_ease-in-out_0.8s_infinite]" },
];

export function FloatingHearts() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
          75% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        {hearts.map((heart) => (
          <div key={heart.alt} className={`absolute ${heart.className}`}>
            <Image
              src={heart.src}
              alt={heart.alt}
              width={96}
              height={96}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </>
  );
}
