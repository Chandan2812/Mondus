import { useState } from "react";

export default function BuyRentSection() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");

  const images = {
    buy: "https://www.axcapital.ae/_ipx/s_630x400/img/sell/buy-sell_buy.webp",
    rent: "https://www.axcapital.ae/_ipx/s_630x400/img/sell/buy-sell_rent.webp",
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* Left Text Block */}
        <div className="border-t border-b border-l border-gray-700 h-[300px] my-auto p-6 md:p-12 flex items-center">
          <div className="space-y-4 w-full">
            {/* BUY Row */}
            <div
              className="relative flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveTab("buy")}
            >
              <h2
                className={`text-5xl font-raleway font-thin tracking-wider transition-colors ${
                  activeTab === "buy" ? "text-black dark:text-white " : ""
                }`}
              >
                BUY
              </h2>
              <div
                className={`relative ml-6 h-[1px] bg-black dark:bg-white transition-all duration-300 ${
                  activeTab === "buy" ? "w-32" : "w-6"
                }`}
              >
                <span
                  className={`absolute -right-2 -top-4 text-black dark:text-white  text-xl transition-opacity duration-300 ${
                    activeTab === "buy" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  &gt;
                </span>
              </div>
            </div>

            {/* RENT Row */}
            <div
              className="relative flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveTab("rent")}
            >
              <h2
                className={`text-5xl font-raleway font-thin tracking-wider transition-colors ${
                  activeTab === "rent" ? "text-black dark:text-white " : ""
                }`}
              >
                RENT
              </h2>
              <div
                className={`relative ml-6 h-[1px] bg-black dark:bg-white transition-all duration-300 ${
                  activeTab === "rent" ? "w-32" : "w-6"
                }`}
              >
                <span
                  className={`absolute -right-2 -top-4 text-black dark:text-white text-xl transition-opacity duration-300 ${
                    activeTab === "rent" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  &gt;
                </span>
              </div>
            </div>

            <p className="text-gray-400 mt-8 text-sm md:text-base leading-relaxed max-w-md">
              With a comprehensive portfolio of properties and countless offers,
              we cover all your real estate needs.
            </p>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="min-h-[300px] md:min-h-[450px]">
          <img
            src={images[activeTab]}
            alt={activeTab}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
