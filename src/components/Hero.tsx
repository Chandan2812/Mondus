import { useState } from "react";
import hero from "../assets/frame_img.svg";

export default function Hero() {
  const [selectedTab, setSelectedTab] = useState("primary");
  const [selectedCurrency, setSelectedCurrency] = useState<
    "GBP" | "CNY" | "EUR" | "AED" | "USD"
  >("AED");
  const [minPrice, setMinPrice] = useState(40000);
  const [maxPrice, setMaxPrice] = useState(150000000);

  // Currency conversion rates for demo purposes
  const conversionRates: {
    [key in "GBP" | "CNY" | "EUR" | "AED" | "USD"]: number;
  } = {
    GBP: 0.22,
    CNY: 1.56,
    EUR: 0.92,
    AED: 1,
    USD: 0.27,
  };

  const handleCurrencyChange = (
    currency: "GBP" | "CNY" | "EUR" | "AED" | "USD"
  ) => {
    setSelectedCurrency(currency);
    const conversionRate = conversionRates[currency];
    setMinPrice(40000 * conversionRate);
    setMaxPrice(150000000 * conversionRate);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pt-28 pb-10 md:pt-5 lg:flex-row items-center justify-between px-6 sm:px-10 relative overflow-hidden dark:bg-black dark:text-white">
      {/* Background Image */}
      <img
        src={hero}
        alt="Dubai Tower"
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
        style={{ background: "var(--bg-primary-gradient)" }}
      />

      {/* Left Content */}
      <div className="font-raleway font-thin relative z-10 w-full sm:w-1/2 lg:w-1/3 px-4 sm:px-6 md:px-10 mb-8 lg:mb-0">
        <h1 className="text-3xl sm:text-4xl leading-snug mb-6">
          INVEST IN DUBAI REAL <br /> ESTATE WITH MONDUS
        </h1>
        <p className="text-lg mb-8 text-white/80">
          We bring <span className="font-semibold">Due Diligence</span> at Your
          service
        </p>
        <button className="border border-[#C29579] text-[#C29579] px-6 py-3 hover:bg-[#C29579]/20 transition dark:text-[#C29579] dark:border-[#C29579] dark:hover:bg-[#C29579]/20">
          Leave a request
        </button>
      </div>

      {/* Right Form */}
      <div className="relative z-10 w-full sm:w-1/3 lg:w-1/3 bg-[#121212]/90 dark: p-8 rounded-lg">
        {/* Toggle Buttons */}
        <div className="flex mb-6">
          <button
            className={`w-1/2 py-2 ${
              selectedTab === "primary"
                ? "bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black"
                : "bg-transparent text-white"
            }`}
            onClick={() => setSelectedTab("primary")}
          >
            Primary
          </button>
          <button
            className={`w-1/2 py-2 ${
              selectedTab === "secondary"
                ? "bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black"
                : "bg-transparent text-white"
            }`}
            onClick={() => setSelectedTab("secondary")}
          >
            Secondary
          </button>
        </div>

        {/* Property Type */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Property type</label>
          <select className="w-full bg-[#1f1f1f] p-3 text-white dark:bg-[#1f1f1f]">
            <option>Villa</option>
            <option>Apartment</option>
            <option>Townhouse</option>
            <option>Studio</option>
            <option>Penthouse</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Bedrooms</label>
          <select className="w-full bg-[#1f1f1f] p-3 text-white dark:bg-[#1f1f1f]">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>
        </div>

        {/* Currency */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Currency</label>
          <div className="flex space-x-4 text-sm text-white/60 cursor-pointer">
            <span
              className={
                selectedCurrency === "GBP"
                  ? "text-[var(--primary-color)] font-semibold"
                  : ""
              }
              onClick={() => handleCurrencyChange("GBP")}
            >
              GBP
            </span>
            <span
              className={
                selectedCurrency === "CNY"
                  ? "text-[var(--primary-color)] font-semibold"
                  : ""
              }
              onClick={() => handleCurrencyChange("CNY")}
            >
              CNY
            </span>
            <span
              className={
                selectedCurrency === "EUR"
                  ? "text-[var(--primary-color)] font-semibold"
                  : ""
              }
              onClick={() => handleCurrencyChange("EUR")}
            >
              EUR
            </span>
            <span
              className={
                selectedCurrency === "AED"
                  ? "text-[var(--primary-color)] font-semibold"
                  : ""
              }
              onClick={() => handleCurrencyChange("AED")}
            >
              AED
            </span>
            <span
              className={
                selectedCurrency === "USD"
                  ? "text-[var(--primary-color)] font-semibold"
                  : ""
              }
              onClick={() => handleCurrencyChange("USD")}
            >
              USD
            </span>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex justify-between mb-6">
          <div className="bg-[#1f1f1f] p-3 w-[48%] dark:bg-[#1f1f1f]">
            Min {minPrice.toLocaleString()} {selectedCurrency}
          </div>
          <div className="bg-[#1f1f1f] p-3 w-[48%] text-right dark:bg-[#1f1f1f]">
            Max {maxPrice.toLocaleString()} {selectedCurrency}
          </div>
        </div>

        {/* Buttons */}
        <button className="w-full bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black py-3 mb-4 hover:bg-[#C29579]/80 transition dark:bg-gradient-to-r dark:from-[#C29579] dark:via-[#e3c5b5] dark:to-[#C29579] dark:text-black dark:hover:bg-[#C29579]/80">
          Show 100+ projects
        </button>
        <button className="w-full border border-[#C29579] py-3 text-[#C29579] hover:bg-[#C29579]/10 transition dark:border-[#C29579] dark:text-[#C29579] dark:hover:bg-[#C29579]/10">
          Properties on map
        </button>
      </div>
    </div>
  );
}
