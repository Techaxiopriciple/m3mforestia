import { useState } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import BrandStory from "./sections/BrandStory";
import Ecosystem from "./sections/Ecosystem";
import Location from "./sections/Location";
import Residences from "./sections/Residences";
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
        <BrandStory />
        <Ecosystem />
        <Location />
        <Residences />
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
