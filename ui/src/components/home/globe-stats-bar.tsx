import Image from "next/image";

const statsItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    text: "No fee to start fundraising",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    text: "1 donation made every second",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    text: "8K+ fundraisers started daily",
  },
];

export function GlobeStatsBar() {
  return (
    <div className="bg-white relative">
      <div className="max-w-container mx-auto px-5 relative flex flex-col items-center">
        {/* Globe image */}
        <div className="flex justify-center">
          <Image
            src="/assets/world-smile-outline.svg"
            alt="World Smile Globe"
            width={920}
            height={920}
            className="w-[200px] md:w-[300px] lg:w-[400px] h-auto opacity-80"
          />
        </div>

        {/* Navy stats bar — pill shape matching frontend */}
        <div className="bg-primary-navy rounded-full h-[76px] w-[84%] max-w-[1200px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-around px-[clamp(15px,3vw,50px)] -mt-4">
          {statsItems.map((item, i) => (
            <div key={item.text} className="flex items-center gap-3 text-white">
              {i > 0 && (
                <div className="hidden md:block w-0.5 h-[30px] bg-white mr-3" />
              )}
              <span className="text-primary-yellow">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
