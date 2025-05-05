import RealEstateExperts from "../components/expert";
import FindYourPartner from "../components/FindYourPartner";
import Hero from "../components/Hero";
import Navbar from "../components/Nav";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RealEstateExperts />
      <FindYourPartner />
    </div>
  );
};
