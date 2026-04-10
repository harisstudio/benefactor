"use client";

import Image from "next/image";

const hearts = [
  // Left side
  { id: 1, src: "/assets/final-heart-1.png", alt: "Your cause", 
    className: "w-[180px] xl:w-[238px] top-[5%] left-[2%] xl:top-[calc(10%_-_20px)] xl:left-[calc(50%_-_670px)] animate-[float_6s_ease-in-out_infinite]" },
  { id: 2, src: "/assets/final-heart-2.png", alt: "Medical", 
    className: "w-[180px] xl:w-[250px] top-[38%] left-[8%] xl:top-[calc(40%_-_65px)] xl:left-[calc(50%_-_570px)] animate-[float_7s_ease-in-out_0.5s_infinite]" },
  { id: 3, src: "/assets/final-heart-3.png", alt: "Emergency", 
    className: "w-[180px] xl:w-[238px] top-[70%] left-[4%] xl:top-[calc(70%_-_80px)] xl:left-[calc(50%_-_670px)] animate-[float_8s_ease-in-out_1s_infinite]" },
  
  // Right side
  { id: 4, src: "/assets/final-heart-4.png", alt: "Education", 
    className: "w-[180px] xl:w-[238px] top-[8%] right-[2%] xl:top-[calc(10%_-_20px)] xl:right-[calc(50%_-_670px)] animate-[float_6.5s_ease-in-out_1.5s_infinite]" },
  { id: 5, src: "/assets/final-heart-5.png", alt: "Animal", 
    className: "w-[180px] xl:w-[250px] top-[42%] right-[6%] xl:top-[calc(40%_-_65px)] xl:right-[calc(50%_-_590px)] animate-[float_7.5s_ease-in-out_2s_infinite]" },
  { id: 6, src: "/assets/final-heart-6.png", alt: "Business", 
    className: "w-[180px] xl:w-[238px] top-[70%] right-[5%] xl:top-[calc(70%_-_80px)] xl:right-[calc(50%_-_670px)] animate-[float_8.5s_ease-in-out_0.8s_infinite]" },
];

export function FloatingHearts() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
      `}</style>
      <div className="absolute top-[-70px] left-0 w-full h-full pointer-events-none hidden md:block z-[5]" aria-hidden="true">
        {hearts.map((heart) => (
          <div key={heart.id} className={`absolute ${heart.className} drop-shadow-xl hover:scale-105 transition-transform duration-500 pointer-events-auto transform-origin-center`}>
            <Image
              src={heart.src}
              alt={heart.alt}
              width={250}
              height={250}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </>
  );
}
