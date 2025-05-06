import RealEstateExperts from "../components/expert";
import FindYourPartner from "../components/FindYourPartner";
import Hero from "../components/Hero";
import Navbar from "../components/Nav";
import PromptConsultation from "../components/PromptConsultation";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RealEstateExperts />
      <FindYourPartner />
      <PromptConsultation />
    </div>
  );
};
