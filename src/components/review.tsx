import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Review {
  name: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "OMER KHAN",
    content:
      "I was looking at the real estate market of Dubai and got in contact with Ms. Hana Taghdis of AX CAPITAL. She showed me multiple projects and finally I was able to select a unit of my choice. I’ve had a great experience dealing with her as she is not only very friendly but also extremely professional.",
    rating: 5,
  },
  {
    name: "NATHALIE SYVAK",
    content:
      "Our real estate agent is Yulia Kravchenko, we are very pleased with her work and I would like to note her approach to the client. Starting from the first conversation, where I was asked all the necessary questions to find something just for us, ending with the signing of a contract with the developer.",
    rating: 4,
  },
  {
    name: "MIKE MIKE",
    content:
      "Ultimate admiration! I wanted to know more about the real estate business in Dubai. God sent me a unique intelligent young lady Yulia Kravchenko, who has undoubtedly the utmost competence in this skill. Very content with an experienced presentation of the topic. Me and my wife are very happy.",
    rating: 5,
  },
  {
    name: "GIUSEPPE IORIO",
    content:
      "Nadia is the person to talk with. She loves her job and is really prepared for any question you may have. Love makes business with her and hopefully we will make so many more.",
    rating: 5,
  },
];

const ReviewSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full bg-black text-white py-10 px-4 sm:px-6 lg:px-12 xl:px-20">
      <h2 className="text-center text-3xl font-light mb-10 tracking-wide">
        REVIEWS
      </h2>
      <Slider {...settings} className="cursor-grab">
        {reviews.map((review, index) => (
          <div key={index} className="px-2 ">
            <div className="bg-[#111] p-6 border border-[#222] rounded-md flex flex-col justify-between h-full ">
              <div>
                <h3 className="text-lg font-light mb-2 uppercase tracking-wide text-gray-200">
                  {review.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {expanded === index
                    ? review.content
                    : `${review.content.slice(0, 150)}...`}
                </p>
              </div>
              <div className="mt-4">
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-orange-400" />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setExpanded((prev) => (prev === index ? null : index))
                  }
                  className="text-sm text-orange-300 hover:underline"
                >
                  {expanded === index ? "SEE LESS" : "READ MORE"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="mt-10 flex flex-col items-center gap-6">
        <button className="text-orange-300 text-sm hover:underline">
          Show All
        </button>
        <button className="border border-orange-300 px-6 py-3 text-orange-300 hover:bg-orange-400 hover:text-black transition-all duration-200">
          Leave your review
        </button>
      </div>
    </section>
  );
};

export default ReviewSection;
