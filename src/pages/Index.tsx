
import Hero from "@/components/home/Hero";
import EventsPreview from "@/components/home/EventsPreview";
import Stats from "@/components/home/Stats";
import SponsorsPreview from "@/components/home/SponsorsPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import RegisterCTA from "@/components/home/RegisterCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <EventsPreview />
        <Stats />
        <GalleryPreview />
        <SponsorsPreview />
        <RegisterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
