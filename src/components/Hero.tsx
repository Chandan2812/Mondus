export default function Hero() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-between px-10 relative overflow-hidden">
      {/* Background Image */}
      <img
        src="/your-burj-image.jpg" // Replace with the correct image path
        alt="Dubai Tower"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* Left Content */}
      <div className="relative z-10 w-1/2">
        <h1 className="text-5xl font-light leading-snug mb-6">
          INVEST IN DUBAI REAL <br /> ESTATE WITH MONDUS
        </h1>
        <p className="text-lg mb-8 text-white/80">
          We bring <span className="font-semibold">Due Diligence</span> at Your
          service
        </p>
        <button className="border border-[#C29579] text-[#C29579] px-6 py-3 hover:bg-[#C29579]/20 transition">
          Leave a request
        </button>
      </div>

      {/* Right Form */}
      <div className="relative z-10 w-1/3 bg-[#121212]/90 p-8 rounded">
        {/* Toggle Buttons */}
        <div className="flex mb-6">
          <button
            className="w-1/2 bg-[#C29579] text-black py-2"
            style={{ background: "var(--bg-primary-gradient)" }}
          >
            Primary
          </button>
          <button className="w-1/2 bg-transparent text-white py-2">
            Secondary
          </button>
        </div>

        {/* Property Type */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Property type</label>
          <select className="w-full bg-[#1f1f1f] p-3 text-white">
            <option>Property type</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Bedrooms</label>
          <select className="w-full bg-[#1f1f1f] p-3 text-white">
            <option>Bedrooms</option>
          </select>
        </div>

        {/* Currency */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Currency</label>
          <div className="flex space-x-4 text-sm text-white/60">
            <span className="text-white font-bold">GBP</span>
            <span>CNY</span>
            <span>EUR</span>
            <span className="text-[#C29579] font-semibold">AED</span>
            <span>USD</span>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex justify-between mb-6">
          <div className="bg-[#1f1f1f] p-3 w-[48%]">Min 40 000</div>
          <div className="bg-[#1f1f1f] p-3 w-[48%] text-right">
            Max 150 000 000
          </div>
        </div>

        {/* Buttons */}
        <button className="w-full bg-[#C29579] text-black py-3 mb-4">
          Show 81 projects
        </button>
        <button className="w-full border border-[#C29579] py-3 text-[#C29579]">
          Properties on map
        </button>
      </div>
    </div>
  );
}
