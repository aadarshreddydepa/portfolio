import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import BentoGrid from "@/components/home/bento/BentoGrid";
import CuratedWork from "@/components/work/CuratedWork";
import SecretSauce from "@/components/home/SecretSauce";
import ScrollingText from "@/components/home/ScrollingText";
import AboutMe from "@/components/about/AboutMe";
import IdeaToApp from "@/components/home/IdeaToApp";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <BentoGrid />
      <CuratedWork />
      <SecretSauce />
      <ScrollingText />
      <AboutMe />
      <Footer />
    </main>
  );
}
