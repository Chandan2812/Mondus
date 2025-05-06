import AboutSection from "../components/AboutSection";
import BuyRentSection from "../components/BuyRentSection";
import Exclusives from "../components/Exclusives";
import RealEstateExperts from "../components/expert";
import FindYourPartner from "../components/FindYourPartner";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LifeStyleSection from "../components/LifestyleSection";
import Navbar from "../components/Nav";
import PromptConsultation from "../components/PromptConsultation";
import RealStateInsights from "../components/RealStateInsights";
import ReviewSection from "../components/review";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RealEstateExperts />
      <BuyRentSection />
      <Exclusives />
      <FindYourPartner />

      <ReviewSection />
      <AboutSection />
      <LifeStyleSection />
      <RealStateInsights />
      <PromptConsultation />

      <Footer />
    </div>
  );
};
