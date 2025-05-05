import React from "react";

const RealEstateExperts: React.FC = () => {
  return (
    <div className="bg-black text-white font-sans">
      {/* Main layout container */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center p-4 md:p-16">
        {/* Image section */}
        <div className="relative w-full flex justify-center md:block">
          <img
            src="https://www.axcapital.ae/_ipx/_/img/real-estate-experts.webp"
            alt="Real Estate Experts"
            className="w-full max-w-md md:max-w-full object-cover rounded-md"
          />

          {/* Mobile stats overlay */}
          <div className="absolute bottom-0 w-full md:hidden bg-black bg-opacity-80 flex justify-around py-4 text-center">
            <div>
              <h3 className="text-lg font-semibold">5000+</h3>
              <p className="text-xs text-gray-400">Offers in the Database</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">30+</h3>
              <p className="text-xs text-gray-400">LANGUAGES</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">500+</h3>
              <p className="text-xs text-gray-400">SPECIALISTS</p>
            </div>
          </div>
        </div>

        {/* Text section including stats */}
        <div className="mt-8 md:mt-0">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            REAL ESTATE EXPERTS
          </h2>
          <p className="text-gray-300 mb-4">
            We understand the fact that modern people strive for maximum
            comfort.
          </p>
          <p className="text-gray-400 mb-6">
            A harmonious environment, communication with professionals, accurate
            and timely information, commitment, reliable and convenient
            technological solutions that save the resources that are important
            to them.
          </p>
          <p className="text-gray-400 mb-6">
            We have implemented all these in MONDUS PROPERTIES
          </p>

          <button className="border border-orange-400 text-orange-400 px-6 py-3 hover:bg-orange-400 hover:text-black transition mb-8">
            Enquire now
          </button>

          {/* Desktop stats here */}
          <div className="hidden md:grid grid-cols-3 text-center gap-6 border-t border-gray-800 pt-8">
            <div>
              <h3 className="text-3xl font-semibold">5000+</h3>
              <p className="text-sm text-gray-400 mt-2">
                OFFERS IN THE DATABASE
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">30+</h3>
              <p className="text-sm text-gray-400 mt-2">LANGUAGES</p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">500+</h3>
              <p className="text-sm text-gray-400 mt-2">SPECIALISTS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateExperts;
