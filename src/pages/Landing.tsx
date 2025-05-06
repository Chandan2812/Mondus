import AboutSection from "../components/AboutSection";
import RealEstateExperts from "../components/expert";
import FindYourPartner from "../components/FindYourPartner";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Nav";
import PromptConsultation from "../components/PromptConsultation";
import ReviewSection from "../components/review";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RealEstateExperts />
      <FindYourPartner />
      <ReviewSection />
      <PromptConsultation />
      <AboutSection />
      <Footer />
    </div>
  );
};
