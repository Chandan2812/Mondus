import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const properties = [
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "7–8%",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
  },
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "7–8%",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
  },
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "7–8%",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
  },
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "7–8%",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
  },
  // Add more property objects as needed
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerPadding: "30px", // Optional: adjust spacing
};

const Exclusives = () => {
  return (
    <section className="bg-black text-white py-10 px-4 md:px-28">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
          EXCLUSIVES
        </h2>
        <p className="text-sm md:text-base">
          Discover the outstanding range of Dubai properties only with{" "}
          <span className="text-[#FF5F5F]">MONDUS PROPERTIES</span>
        </p>
      </div>

      <Slider {...settings}>
        {properties.map((property, index) => (
          <div key={index} className="px-4">
            {" "}
            {/* Slide spacing */}
            <div className="flex flex-col md:flex-row bg-[#1A1A1A] rounded-lg overflow-hidden">
              {/* Left side with image */}
              <div className="w-full md:w-1/2">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover md:h-[80vh]"
                />
                <div className="p-4">
                  <h3 className="text-xl md:text-2xl font-light mb-2">
                    {property.title}
                  </h3>
                  <p className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    {property.location}
                  </p>
                </div>
              </div>

              {/* Right side with content */}
              <div className="w-full md:w-1/2 p-6 flex flex-col gap-4">
                <div>
                  <h4 className="text-lg font-semibold mb-1">ROI</h4>
                  <p className="text-sm">Expected ROI – {property.roi}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">PRIME LOCATION</h4>
                  <p className="text-sm">{property.locationDetails}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">PAYMENT PLAN</h4>
                  <p className="text-sm">{property.paymentPlan}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">DESIGN</h4>
                  <p className="text-sm">{property.design}</p>
                </div>
                <p className="text-sm text-gray-300">{property.description}</p>
                <p className="text-sm font-light">
                  Handover date: {property.handover}
                </p>
                <div className="mt-4 flex gap-4">
                  <button className="bg-[#F6C667] text-black px-6 py-2 rounded">
                    Enquire now
                  </button>
                  <button className="border border-white px-6 py-2 rounded">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="mt-6 flex justify-between text-sm text-white/70">
        <span>PREV</span>
        <span className="text-white">3 / 4</span>
        <span>NEXT</span>
      </div>
    </section>
  );
};

export default Exclusives;
