import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icon import
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import image4 from "../assets/image4.webp";
import image5 from "../assets/image5.webp";
import image6 from "../assets/image6.webp";

const lifestyleData = [
  {
    title: "Downtown Living",
    image: image1,
  },
  {
    title: "Residential Community",
    image: image2,
  },
  {
    title: "Marina Living",
    image: image3,
  },
  {
    title: "Suburban Escape",
    image: image4,
  },
  {
    title: "Beachfront Bliss",
    image: image5,
  },
  {
    title: "Skyline Retreat",
    image: image6,
  },
];

const LifeStyleSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 3 < lifestyleData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCards = lifestyleData.slice(startIndex, startIndex + 3);

  return (
    <div className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-light mb-2">LIFESTYLE</h2>
        <p className="text-center text-gray-400 mb-8">
          Wide range options for any lifestyle. Make your choice with us
        </p>

        <div className="flex justify-center gap-6">
          {visibleCards.map((item, index) => (
            <div
              key={index}
              className="w-[400px] h-[300px] bg-black text-white shadow-lg flex flex-col justify-between"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[230px] object-cover"
              />
              <div className="bg-black bg-opacity-70 text-center py-2">
                <h3 className="text-lg mb-1">{item.title}</h3>
                <button className="text-sm border-t pt-1 border-gray-500 w-full hover:text-gray-300">
                  EXPLORE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8 px-2 sm:px-6 text-gray-400">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="flex items-center gap-2 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            PREV
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + 3 >= lifestyleData.length}
            className="flex items-center gap-2 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            NEXT
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LifeStyleSection;
