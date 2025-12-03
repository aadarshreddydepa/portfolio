import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import BentoGrid from "@/components/bento/BentoGrid";
import ThemeToggle from "@/components/ThemeToggle";
import CuratedWork from "@/components/CuratedWork";
import SecretSauce from "@/components/SecretSauce";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />

      <Hero />
      <BentoGrid />
      <CuratedWork />
      <SecretSauce />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <Footer />
    </main>
  );
}
