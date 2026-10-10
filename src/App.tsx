import { useCallback, useState } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import OfferBand from "./sections/OfferBand";
import Ecosystem from "./sections/Ecosystem";
import GrandWelcome from "./sections/GrandWelcome";
import NatureAddress from "./sections/NatureAddress";
import Gallery from "./sections/Gallery";
import FloorPlans from "./sections/FloorPlans";
import Biodiversity from "./sections/Biodiversity";
import ImmersiveTour from "./sections/ImmersiveTour";
import FloatingForm from "./components/FloatingForm";
import AdPopup from "./components/AdPopup";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(true);
  const closeAd = useCallback(() => setIsAdOpen(false), []);
  const isAdVisible = !loading && isAdOpen;

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      {!loading && <AdPopup isOpen={isAdOpen} onClose={closeAd} />}
      <Nav isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <FloatingContact />
      <main>
        <Hero />
        <OfferBand /> 
        <Ecosystem/>
        <GrandWelcome />
        <NatureAddress />
        <Gallery />
        <Biodiversity />
        <FloorPlans />
        <ImmersiveTour />
        {!isDrawerOpen && !isAdVisible && <FloatingForm />}
      </main>
      <Footer />
    </>
  );
}