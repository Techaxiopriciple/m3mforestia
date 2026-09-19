import { useState } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import EnquirePopup from "./sections/EnquirePopup"; // <-- Sahi import path yahan set karein agar path alag ho
import Hero from "./sections/Hero";
import Ecosystem from "./sections/Ecosystem";
import Clubhouse from "./sections/Clubhouse";
import Gallery from "./sections/Gallery";
import FloorPlans from "./sections/FloorPlans";
import ClubEden from "./sections/ClubEden";
import Biodiversity from "./sections/Biodiversity";
import InnovationPark from "./sections/InnovationPark";
import ImmersiveTour from "./sections/ImmersiveTour";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Nav />
      <FloatingContact />
      <EnquirePopup />
      <main>
        <Hero ready={!loading} />
        <Ecosystem />
        <Gallery />
        <Clubhouse />
        <ClubEden />
        <Biodiversity />
        <InnovationPark />
        <FloorPlans />
        <ImmersiveTour />
      </main>
      <Footer />
    </>
  );
}