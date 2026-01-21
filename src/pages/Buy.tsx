import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BedDouble,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
} from "lucide-react";
import { Bath } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load components
const Navbar = lazy(() => import("../components/Nav"));
const Footer = lazy(() => import("../components/Footer"));
const NotifyMe = lazy(() => import("../components/NotifyMe"));

const Buy: React.FC = () => {
  const [saleData, setSentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bedroomFilter, setBedroomFilter] = useState<string>("");
  const [bathroomFilter, setBathroomFilter] = useState<string>("");
  const [subareaFilter, setSubareaFilter] = useState<string>("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("");
  const [minAreaFilter, setMinAreaFilter] = useState<string>("");
  const [maxAreaFilter, setMaxAreaFilter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("saleProperties");
        if (cachedData) {
          // Use cached data
          setSentData(JSON.parse(cachedData));
          setLoading(false);
        } else {
          // Fetch fresh data and cache it
          const response = await fetch(
            "https://mondus-backend.onrender.com/api/properties/sale",
          );
          const data = await response.json();
          setSentData(data);
          console.log(data);
          localStorage.setItem("saleProperties", JSON.stringify(data));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching sale properties:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const uniquePropertyTypes = Array.from(
    new Set(saleData.map((p) => p.properties.property_type)),
  ).filter(Boolean);

  const uniqueSubareas = Array.from(
    new Set(saleData.map((p) => p.properties.link_subarea)),
  ).filter(Boolean);

  const properties = saleData.filter((property) => {
    const bedrooms = Number(property.properties.bedrooms_number || 0);
    const bathrooms = Number(property.properties.bathrooms_number || 0);
    const subarea = property.properties.link_subarea;
    const propertyType = property.properties.property_type;
    const buaArea = Number(property.properties.bua_area_size || 0);

    const bedroomMatch =
      !bedroomFilter ||
      (bedroomFilter === "4"
        ? bedrooms >= 4
        : bedrooms === Number(bedroomFilter));

    const bathroomMatch =
      !bathroomFilter ||
      (bathroomFilter === "4"
        ? bathrooms >= 4
        : bathrooms === Number(bathroomFilter));

    const subareaMatch = !subareaFilter || subarea === subareaFilter;

    const propertyTypeMatch =
      !propertyTypeFilter || propertyType === propertyTypeFilter;

    const minAreaMatch = !minAreaFilter || buaArea >= Number(minAreaFilter);

    const maxAreaMatch = !maxAreaFilter || buaArea <= Number(maxAreaFilter);

    return (
      bedroomMatch &&
      bathroomMatch &&
      subareaMatch &&
      propertyTypeMatch &&
      minAreaMatch &&
      maxAreaMatch
    );
  });

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin">
      <div className="mb-16 md:mb-28 pt-5">
        <Suspense
          fallback={<div className="text-center py-4">Loading navbar...</div>}
        >
          <Navbar />
        </Suspense>
      </div>

      <h1 className="text-2xl text-center">PROPERTIES FOR SALE IN DUBAI</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
        {/* Bedroom Dropdown */}
        <select
          className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
          value={bedroomFilter}
          onChange={(e) => setBedroomFilter(e.target.value)}
        >
          <option value="">Select Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>

        {/* Bathroom Dropdown */}
        <select
          className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
          value={bathroomFilter}
          onChange={(e) => setBathroomFilter(e.target.value)}
        >
          <option value="">Select Bathrooms</option>
          <option value="1">1 Bathroom</option>
          <option value="2">2 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
          <option value="4">4+ Bathrooms</option>
        </select>

        {/* Subarea Dropdown */}
        <select
          className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
          value={subareaFilter}
          onChange={(e) => setSubareaFilter(e.target.value)}
        >
          <option value="">Select Subarea</option>
          {uniqueSubareas.map((subarea, index) => (
            <option key={index} value={subarea}>
              {subarea}
            </option>
          ))}
        </select>

        {/* Property Type Dropdown */}
        <select
          className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
          value={propertyTypeFilter}
          onChange={(e) => setPropertyTypeFilter(e.target.value)}
        >
          <option value="">Select Property Type</option>
          {uniquePropertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* BUA Area Range Inputs */}
        <input
          type="number"
          className="border p-2 rounded w-28 dark:bg-neutral-800 dark:text-white"
          placeholder="Min sqft"
          value={minAreaFilter}
          onChange={(e) => setMinAreaFilter(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded w-28 dark:bg-neutral-800 dark:text-white"
          placeholder="Max sqft"
          value={maxAreaFilter}
          onChange={(e) => setMaxAreaFilter(e.target.value)}
        />
      </div>

      {/* Property Grid Section */}
      <div className="relative w-full md:w-[90%] mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : saleData.length === 0 ? (
          <p className="text-center text-gray-900 dark:text-gray-300 min-h-[300px] flex items-center justify-center">
            No property data available. Please check back later.
          </p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-900 dark:text-gray-300 min-h-[300px] flex items-center justify-center">
            No properties match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, id) => (
              <Link to={`/buy/${property.id}`} key={id} className="h-full">
                <div className="bg-gray-100 dark:bg-neutral-900 shadow rounded overflow-hidden border border-gray-300 dark:border-gray-800 flex flex-col h-full">
                  {/* Lazy image */}
                  <div className="relative">
                    <img
                      loading="lazy"
                      src={
                        property.properties?.more_photo?.key_0?.src ||
                        "/placeholder.jpg"
                      }
                      alt={property.title}
                      className="w-full h-56 object-cover"
                    />
                  </div>

                  <div className="space-y-1 px-4 py-2 flex-grow">
                    <h3 className="text-lg">
                      {property.properties.link_subarea}
                    </h3>
                    <p className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {property.properties.link_district}
                    </p>
                    <p className="text-sm">
                      {property.properties.property_type}
                    </p>

                    <div className="flex items-center text-sm gap-4 py-1">
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4" />
                        <span>{property.properties.bedrooms_number}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.properties.bathrooms_number}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        <span>{property.properties.bua_area_size} sqft</span>
                      </div>
                    </div>

                    <p className="text-lg font-bold text-[var(--primary-color)]">
                      {property.price}
                    </p>
                  </div>

                  {/* Contact Icons */}
                  <div className="border-t border-gray-300 dark:border-white/20 mt-auto flex justify-around items-center text-[var(--primary-color)] py-2 text-sm divide-x dark:divide-white/20 divide-gray-300">
                    <a
                      href={`tel:${property.properties.link_to_employee.phone}`}
                      className="flex-1 flex justify-center items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${property.properties.link_to_employee.email}`}
                      className="flex-1 flex justify-center items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://wa.me/${property.properties.link_to_employee.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Suspense
        fallback={
          <div className="text-center py-4">Loading notify section...</div>
        }
      >
        <NotifyMe />
      </Suspense>

      <Suspense
        fallback={<div className="text-center py-4">Loading footer...</div>}
      >
        <Footer />
      </Suspense>
    </div>
  );
};

export default Buy;
