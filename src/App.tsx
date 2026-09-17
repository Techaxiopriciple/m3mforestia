import { useState } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Ecosystem from "./sections/Ecosystem";
import Clubhouse from "./sections/Clubhouse";
import Residences from "./sections/Residences";
import FloorPlans from "./sections/FloorPlans";
import ClubEden from "./sections/ClubEden";
import Biodiversity from "./sections/Biodiversity";
import InnovationPark from "./sections/InnovationPark";

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
        <Residences />
        <Clubhouse />
        <ClubEden />
        <Biodiversity />
        <InnovationPark />
        <FloorPlans />
      </main>
      <Footer />
    </>
  );
}
