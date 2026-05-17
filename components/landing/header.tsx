import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex justify-center pt-4 px-6">
      <div className="w-full max-w-7xl flex items-center justify-between">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          
          {/* Logo */}
          <div className="relative h-20 w-20 rounded-fulloverflow-hidden">
            <Image
              src="/logo.png"
              alt="Sakhi Logo"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-violet-700 leading-none">
              Sakhi
            </h1>

            <p className="text-muted-foreground text-xs mt-1">
              Smarter choices. Healthier tomorrow.
            </p>
          </div>
        </div>
        <a href="#auth-section">
        <button
        className="
            flex items-center gap-3
            rounded-full
            border border-violet-600
            bg-violet-700
            px-3 py-3
            text-white
            font-medium
            hover:bg-violet-50
            transition-colors
            hover:text-violet-700
        "
        >
        {/* Circle Icon */}
        <div
            className="
            flex items-center justify-center
            h-7 w-7
            rounded-full
            bg-white
            "
        >
            <span className="text-sm text-violet-700">→</span>
        </div>

        Get Started
        </button>
        </a>
      </div>
    </header>
  );
}