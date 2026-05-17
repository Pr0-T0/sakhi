import { AuthButton } from "@/components/auth-button";
import AuthSection from "@/components/landing/auth-section";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9ff]">
      <Header />
      <HeroSection/>
      <AuthSection />
    </main>
  );
}