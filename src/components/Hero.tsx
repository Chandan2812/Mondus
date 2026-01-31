// import { useState } from "react";
// import hero from "../assets/frame_img.png";
import "../index.css";
import hero_video from "../assets/mondus-home-video.mp4";

export default function Hero() {
  // const [selectedCurrency, setSelectedCurrency] = useState<
  //   "GBP" | "CNY" | "EUR" | "AED" | "USD" | "INR" | "RUB"
  // >("AED");
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);

  // Currency conversion rates for demo purposes
  // const conversionRates: {
  //   [key in "GBP" | "CNY" | "EUR" | "AED" | "USD" | "INR" | "RUB"]: number;
  // } = {
  //   GBP: 0.22,
  //   CNY: 1.56,
  //   EUR: 0.92,
  //   AED: 1,
  //   USD: 0.27,
  //   INR: 22.4,
  //   RUB: 24.9,
  // };
  // const handleCurrencyChange = (
  //   currency: "GBP" | "CNY" | "EUR" | "AED" | "USD" | "INR" | "RUB"
  // ) => {
  //   setSelectedCurrency(currency);
  //   const conversionRate = conversionRates[currency];
  //   setMinPrice(40000 * conversionRate);
  //   setMaxPrice(150000000 * conversionRate);
  // };

  return (
    <div className="h-[50vh] md:h-[100vh] bg-black text-white flex flex-col pt-28 pb-10 md:pt-5 lg:flex-row items-center justify-between px-6 sm:px-10 relative overflow-hidden dark:bg-black dark:text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        src={hero_video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Fallback Image (optional, for very slow connections) */}
      {/* <img
        src={hero}
        alt="Dubai Tower"
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
        draggable="false"
      /> */}

      {/* Left Content */}
      <div className="font-raleway font-light relative z-10 w-full md:w-1/2  px-4  md:px-10 mb-8 lg:mb-0">
        <h1 className="text-3xl md:text-5xl  font-semibold mb-5 font-merriweather whitespace-pre-wrap">
          {"Dream It. Live It. \nOwn Your Home in Dubai."}
        </h1>
        <h1 className="text-xl md:text-3xl leading-snug mb-6 uppercase">
          Luxury homes, prime investments and expert guidance WITH{" "}
          <span className="text-[var(--primary-color)] font-bold">
            MONDUS PROPERTIES
          </span>
        </h1>
      </div>

      {/* Right Form */}
      {/* <div className="relative w-full sm:w-11/12 lg:w-[420px] bg-[#121212]/90 p-8 rounded-2xl shadow-xl border border-[#333] backdrop-blur-md space-y-6 mt-5">
   
        <div className="space-y-4 font-raleway font-thin">
          <div>
            <label className="text-sm mb-1 block">Property Type</label>
            <select className="w-full bg-[#1f1f1f] p-3 rounded text-white border border-gray-700">
              <option>Villa</option>
              <option>Apartment</option>
              <option>Townhouse</option>
              <option>Studio</option>
              <option>Penthouse</option>
            </select>
          </div>
          <div>
            <label className="text-sm mb-1 block">Bedrooms</label>
            <select className="w-full bg-[#1f1f1f] p-3 rounded text-white border border-gray-700">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </select>
          </div>
        </div>

      
        <div>
          <label className="text-sm mb-2 block font-raleway font-thin">
            Currency
          </label>
          <div className="flex flex-wrap gap-1 text-xs font-raleway font-thin">
            {["AED", "USD", "EUR", "GBP", "CNY", "INR", "RUB"].map((cur) => (
              <span
                key={cur}
                onClick={() => handleCurrencyChange(cur as any)}
                className={`px-2 py-1 rounded-full border cursor-pointer ${
                  selectedCurrency === cur
                    ? "bg-[var(--primary-color)] text-black font-semibold"
                    : "border-gray-600 text-white/70 hover:border-white"
                }`}
              >
                {cur}
              </span>
            ))}
          </div>
        </div>

   
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm mb-1 block font-raleway font-thin">
              Min Price ({selectedCurrency})
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full bg-[#1f1f1f] p-3 rounded text-white border border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm mb-1 block font-raleway font-thin">
              Max Price ({selectedCurrency})
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full bg-[#1f1f1f] p-3 rounded text-white border border-gray-700"
            />
          </div>
        </div>

 
        <button className="w-full font-raleway font-light bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black py-3 hover:opacity-90 transition">
          Show Projects
        </button>
      </div> */}
    </div>
  );
}
