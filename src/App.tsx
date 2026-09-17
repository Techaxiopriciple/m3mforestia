import { useState } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Ecosystem from "./sections/Ecosystem";
import GrandWelcome from "./sections/GrandWelcome";
import Clubhouse from "./sections/Clubhouse";
import Residences from "./sections/Residences";
import FloorPlans from "./sections/FloorPlans";
import CentralGrove from "./sections/CentralGrove";
import ClubEden from "./sections/ClubEden";
import Biodiversity from "./sections/Biodiversity";
import Gallery from "./sections/Gallery";
import Enquiry from "./sections/Enquiry";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Nav />
      <FloatingContact />
      <main>
        <Hero ready={!loading} />
        <Ecosystem />
        <GrandWelcome />
        <Residences />
        <Clubhouse />
        <FloorPlans />
        <CentralGrove />
        <ClubEden />
        <Biodiversity />
        <Gallery />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
