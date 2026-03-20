import AboutSection from "../components/AboutSection";
import AwardsSection from "../components/awards";
import BuyRentSection from "../components/BuyRentSection";
import DeveloperScroll from "../components/DeveloperScroll";
import Exclusives from "../components/Exclusives";
import RealEstateExperts from "../components/expert";
import FaqCtaSection from "../components/Faqctasection";
// import FindYourPartner from "../components/FindYourPartner";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
// import LifeStyleSection from "../components/LifestyleSection";
import ListProperty from "../components/listproperty";
import Navbar from "../components/Nav";
import NewsSubscribeSection from "../components/NewsLetterSection";
import NotifyMe from "../components/NotifyMe";
import PropertySection from "../components/Propertysection";
// import PromptConsultation from "../components/PromptConsultation";
// import RealStateInsights from "../components/RealStateInsights";
import ReviewSection from "../components/review";
import ScrollToTopButton from "../components/ScrollToTopButton";
import WhatWeDoSection from "../components/WhatWeDoSection";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RealEstateExperts />
      <PropertySection />
      <BuyRentSection />
      <Exclusives />
      {/* <FindYourPartner /> */}
      <AboutSection />
      <WhatWeDoSection />
      <ListProperty />
      <DeveloperScroll />
      <AwardsSection />
      <ReviewSection />
      <FaqCtaSection />

      {/* <LifeStyleSection /> */}
      {/* <RealStateInsights /> */}
      {/* <PromptConsultation /> */}
      <NotifyMe />
      <NewsSubscribeSection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};
