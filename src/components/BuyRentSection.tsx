import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function BuyRentSection() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");

  const images = {
    buy: "https://www.axcapital.ae/_ipx/s_630x400/img/sell/buy-sell_buy.webp",
    rent: "https://www.axcapital.ae/_ipx/s_630x400/img/sell/buy-sell_rent.webp",
  };

  return (
    <div className="bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
        {/* Left Text Block with border */}
        <div className="border border-gray-700 p-6 h-64 md:p-12 flex flex-col justify-center">
          <div className="space-y-4">
            <div
              className="flex items-center gap-4 group cursor-pointer"
              onMouseEnter={() => setActiveTab("buy")}
            >
              <h2 className="text-5xl font-raleway font-thin tracking-wider group-hover:text-white transition">
                BUY
              </h2>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div
              className="flex items-center gap-4 group cursor-pointer"
              onMouseEnter={() => setActiveTab("rent")}
            >
              <h2 className="text-5xl font-raleway font-thin tracking-wider group-hover:text-white transition">
                RENT
              </h2>
              <ArrowRight className="group-hover:translate-x-1  transition-transform" />
            </div>
            <p className="text-gray-400 mt-8 text-sm md:text-base leading-relaxed max-w-md">
              With a comprehensive portfolio of properties and countless offers,
              we cover all your real estate needs.
            </p>
          </div>
        </div>

        {/* Right Image Block without border */}
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
