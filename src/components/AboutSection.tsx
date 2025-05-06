"use client";

import { useState } from "react";

export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-black text-white px-4 py-12 md:py-20 flex justify-center relative overflow-hidden custom-gradient-lines">
      <div className="border border-gray-700 max-w-7xl w-full p-6 md:p-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-[#d3a188] mb-6">
          MONDUS PROPERTIES – A REAL ESTATE AGENCY IN DUBAI
        </h2>

        <p className="text-sm md:text-base text-gray-300 mb-6">
          MONDUS PROPERTIES is a professional real estate agency involved in
          sale and rent of properties in Dubai, UAE. We process our clients’
          requests promptly in a CRM system, so all your questions will be
          answered timeously. Our competent team members are always available
          and are happy to consult with you on property selection at any time.
        </p>

        <p className="text-sm md:text-base text-gray-500 mb-6">
          Our team is comprised of experts of over 40 nationalities,
          collectively speaking 30 languages, allowing us to communicate with
          clients, understand their needs, and respond to any requests. With
          over 500 real estate professionals on our team, we are passionate
          about improving our professional skills.
        </p>

        {/* Read More / See Less Button */}
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="text-[#d3a188] text-sm tracking-wide inline-block border-t border-[#d3a188] pt-2 hover:underline"
          >
            READ MORE
          </button>
        ) : (
          <>
            {/* Expanded Content */}
            <div className="mt-6 space-y-4 text-sm md:text-base text-gray-400">
              <p>
                Our database is constantly being updated and includes over 5,000
                properties, allowing our customers to choose a home to their
                taste in any of the emirates. Permanent partners of the real
                estate agency MONDUS PROPERTIES include over 100 trusted
                developers.
              </p>
              <p>
                We offer our clients off-plan properties in Dubai, as well as
                homes in popular development projects that already have an
                excellent reputation. In the year 2022 alone, our team members
                closed 10,000 successful deals with over 7,000 clients.
              </p>
              <p>
                Information technology is only just emerging in the Dubai real
                estate market but we are actively investing in developing
                in-house IT solutions, such as:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Innovative property sales platforms</li>
                <li>CRM systems for brokers and developers</li>
                <li>New VR and AR solutions for property marketing</li>
              </ul>
              <p>
                These new tools equip us to find the best bargains and allow us
                to offer them to our customers.
              </p>

              <h3 className="text-[#d3a188] font-semibold mt-4">Investment</h3>
              <p>
                Buy-to-live and buy-to-rent properties, as well as vacation
                homes in the UAE generate a high stable income. The return on
                investment in some of Dubai’s most in-demand communities can
                exceed 10% per annum, which is higher than the average ROI in
                European and other global property markets. Additionally, the
                UAE Government guarantees that the closed deals are legal and
                transparent.
              </p>

              <h3 className="text-[#d3a188] font-semibold mt-4">
                Real estate agency services in Dubai, UAE
              </h3>
              <p>
                Are you thinking of buying a property through a real estate
                agency in Dubai? We have extensive experience of working in the
                Emirates and insider knowledge of the UAE’s real estate market.
                Our luxury real estate agency offers a comprehensive range of
                services, which include:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  A selection of investment properties that meet customers’
                  personal requirements and preferences
                </li>
                <li>
                  Purchase, rent, and sale transactions of residential, retail,
                  and office properties, remotely or in person, with the
                  customer present
                </li>
                <li>
                  The after-sales maintenance and management of residential and
                  commercial properties
                </li>
                <li>Legal advice from highly competent professional lawyers</li>
                <li>
                  Assistance with opening a bank account in the UAE and
                  consultations on procuring other financial documents
                </li>
              </ul>

              <h3 className="text-[#d3a188] font-semibold mt-4">
                Buying property through an agency in Dubai
              </h3>
              <p>
                The high demand in the housing market boosts the prices of
                villas and apartments in Dubai. Our agency has access to the
                current information provided by the UAE public authorities and
                developers.
              </p>
              <p>
                You can purchase a premium villa, apartment, or townhouse today.
                We will guide you to discover the best options of buy-to-rent,
                buy-to-live, and vacation homes amidst a multitude of listings.
                All you need to do is simply fill out an online request and
                professionals from the upscale real estate agency, MONDUS
                PROPERTIES, will contact you at any time convenient for you.
              </p>
            </div>

            {/* See Less Button */}
            <div className="mt-6">
              <button
                onClick={() => setExpanded(false)}
                className="text-[#d3a188] text-sm tracking-wide inline-block border-t border-[#d3a188] pt-2 hover:underline"
              >
                SEE LESS
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
