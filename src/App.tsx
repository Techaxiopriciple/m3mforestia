import { useState } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import OfferBand from "./sections/OfferBand";
import Ecosystem from "./sections/Ecosystem";
import GrandWelcome from "./sections/GrandWelcome";
import Gallery from "./sections/Gallery";
import FloorPlans from "./sections/FloorPlans";
import ClubEden from "./sections/ClubEden";
import Biodiversity from "./sections/Biodiversity";
import ImmersiveTour from "./sections/ImmersiveTour";
import FloatingForm from "./components/FloatingForm";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Nav />
      <FloatingContact />
      <main>
        <Hero />
        <OfferBand />
        <Ecosystem />
        <GrandWelcome />
        <Gallery />
        <ClubEden />
        <FloorPlans />
        <ImmersiveTour />
        <FloatingForm />
        <Biodiversity />
      </main>
      <Footer />
    </>
  );
}