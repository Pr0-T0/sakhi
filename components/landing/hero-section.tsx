import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center text-center px-4 sm:px-6 pt-2">
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        <span className="text-black dark:text-white">
          Welcome to{" "}
        </span>

        <span className="text-violet-700">
          Sakhi
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-1 max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
        Your AI-powered companion for chemical safety
        and healthier living.
      </p>

      {/* Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
        
        {/* Card 1 */}
        <div className="rounded-[28px] overflow-hidden border border-violet-200 bg-violet-50 p-3">
          <Image
            src="/card-1.png"
            alt="Scan Product"
            width={600}
            height={1000}
            loading="eager"
            className="w-full h-auto object-contain rounded-[24px]"
          />
        </div>

        {/* Card 2 */}
        <div className="rounded-[28px] overflow-hidden border border-green-200 bg-green-50 p-3">
          <Image
            src="/card-2.png"
            alt="AI Insights"
            width={600}
            height={1000}
            loading="eager"
            className="w-full h-auto object-contain rounded-[24px]"
          />
        </div>

        {/* Card 3 */}
        <div className="rounded-[28px] overflow-hidden border border-blue-200 bg-blue-50 p-3">
          <Image
            src="/card-3.png"
            alt="Safer Alternatives"
            width={600}
            height={1000}
            loading="eager"
            className="w-full h-auto object-contain rounded-[24px]"
          />
        </div>

        {/* Card 4 */}
        <div className="rounded-[28px] overflow-hidden border border-orange-200 bg-orange-50 p-3">
          <Image
            src="/card-4.png"
            alt="Tracking"
            width={600}
            height={1000}
            loading="eager"
            className="w-full h-auto object-contain rounded-[24px]"
          />
        </div>

      </div>
    </section>
  );
}