import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import generateSlug from "../../utils/generateSlug";

/* ================= TYPES ================= */

type ListingType = "buy" | "sell" | "rent" | "offPlan";
type ConfirmAction = "delete" | "status" | null;

export interface Property {
  _id: string;

  propertyName: string;
  slug: string;

  listingType: ListingType; // "buy" | "rent"
  propertyType: string;

  price: number;

  bedroom: number;
  bathroom: number;
  sizeSqft: number;

  address: string;
  subArea: string;

  developerName: string;

  propertyDetails: string;

  /* NEW FIELDS */
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  extraHighlights: string[];

  videoLink?: string | null;
  googleMapUrl?: string | null;

  propertyImages: string[];
  propertyBrochure?: string | null;

  status: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface PropertyForm {
  propertyName: string;
  slug: string;
  listingType: ListingType;
  propertyType: string;

  price: string;

  bedroom: string;
  bathroom: string;
  sizeSqft: string;

  address: string;
  subArea: string;

  developerName: string;
  propertyDetails: string;

  /* NEW UI FIELDS */
  highlights: string;
  featuresAmenities: string;
  nearby: string;
  extraHighlights: string;

  videoLink: string;
  googleMapUrl: string;

  /* FILES */
  propertyImages: File[];
  propertyBrochure?: File | null;
}

type ImageItem =
  | { id: string; type: "existing"; url: string }
  | { id: string; type: "new"; file: File; preview: string };

/* ================= CONFIG ================= */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAGE_LIMIT = 5;

/* ================= COMPONENT ================= */

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [brochure, setBrochure] = useState<File | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  /* Pagination */
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(properties.length / PAGE_LIMIT);

  /* Modal */
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);

  /* Form */
  const [form, setForm] = useState<PropertyForm>({
    propertyName: "",
    slug: "",
    listingType: "buy",
    propertyType: "",

    price: "",

    bedroom: "",
    bathroom: "",
    sizeSqft: "",

    address: "",
    subArea: "",

    developerName: "",
    propertyDetails: "",

    highlights: "",
    featuresAmenities: "",
    nearby: "",
    extraHighlights: "",

    videoLink: "",
    googleMapUrl: "",

    propertyImages: [],
    propertyBrochure: null,
  });

  /* ================= FETCH ================= */

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/property`);
      setProperties(res.data.data);
    } catch {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  console.log(properties);

  /* ================= IMAGE HANDLING ================= */

  const handleImages = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      type: "new",
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const list = [...images];
    const dragged = list.splice(dragItem.current, 1)[0];
    list.splice(dragOverItem.current, 0, dragged);

    dragItem.current = null;
    dragOverItem.current = null;
    setImages(list);
  };

  /* ================= CREATE / UPDATE ================= */

  // const handleSubmit = async () => {
  //   try {
  //     if (images.length === 0) {
  //       toast.error("At least one image is required");
  //       return;
  //     }

  //     if (
  //       !form.propertyName ||
  //       !form.propertyType ||
  //       !form.address ||
  //       !form.propertyDetails
  //     ) {
  //       toast.error("Please fill all required fields");
  //       return;
  //     }

  //     const formData = new FormData();

  //     formData.append("propertyName", form.propertyName);
  //     formData.append("listingType", form.listingType);
  //     formData.append("propertyType", form.propertyType);
  //     formData.append("address", form.address);
  //     formData.append("subArea", form.subArea);
  //     formData.append("propertyDetails", form.propertyDetails);
  //     formData.append("developerName", form.developerName);

  //     // ✅ Convert numbers properly
  //     formData.append("bedroom", String(Number(form.bedroom)));
  //     formData.append("bathroom", String(Number(form.bathroom)));
  //     formData.append("sizeSqft", String(Number(form.sizeSqft)));

  //     // ✅ Send images correctly
  //     images.forEach((img) => {
  //       if (img.type === "new") {
  //         formData.append("propertyImages", img.file);
  //       }
  //     });

  //     if (brochure) {
  //       formData.append("propertyBrochure", brochure);
  //     }

  //     if (editing) {
  //       await axios.put(
  //         `${API_BASE_URL}/api/property/${editing._id}`,
  //         formData,
  //       );
  //       toast.success("Property updated");
  //     } else {
  //       await axios.post(`${API_BASE_URL}/api/property`, formData);
  //       toast.success("Property created");
  //     }

  //     closeForm();
  //     fetchProperties();
  //   } catch (error: any) {
  //     console.error(error.response?.data);
  //     toast.error(error.response?.data?.message || "Operation failed");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      if (images.length === 0) {
        toast.error("At least one image is required");
        return;
      }

      if (
        !form.propertyName ||
        !form.slug ||
        !form.propertyType ||
        !form.address ||
        !form.propertyDetails ||
        !form.price
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();

      /* BASIC INFO */
      formData.append("propertyName", form.propertyName);
      formData.append("slug", form.slug);
      formData.append("listingType", form.listingType);
      formData.append("propertyType", form.propertyType);
      formData.append("address", form.address);
      formData.append("subArea", form.subArea);
      formData.append("developerName", form.developerName);
      formData.append("propertyDetails", form.propertyDetails);

      /* NUMBERS */
      formData.append("price", String(Number(form.price)));
      formData.append("bedroom", String(Number(form.bedroom)));
      formData.append("bathroom", String(Number(form.bathroom)));
      formData.append("sizeSqft", String(Number(form.sizeSqft)));

      /* OPTIONAL TEXT FIELDS */
      if (form.highlights) formData.append("highlights", form.highlights);

      if (form.featuresAmenities)
        formData.append("featuresAmenities", form.featuresAmenities);

      if (form.nearby) formData.append("nearby", form.nearby);

      if (form.extraHighlights)
        formData.append("extraHighlights", form.extraHighlights);

      if (form.videoLink) formData.append("videoLink", form.videoLink);

      if (form.googleMapUrl) formData.append("googleMapUrl", form.googleMapUrl);

      /* IMAGES */
      images.forEach((img) => {
        if (img.type === "new") {
          formData.append("propertyImages", img.file);
        }
      });

      /* BROCHURE */
      if (brochure) {
        formData.append("propertyBrochure", brochure);
      }

      /* API CALL */
      if (editing) {
        await axios.put(
          `${API_BASE_URL}/api/property/${editing._id}`,
          formData,
        );
        toast.success("Property updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/property`, formData);
        toast.success("Property created successfully");
      }

      closeForm();
      fetchProperties();
    } catch (error: any) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  /* ================= DELETE (OPTIMISTIC) ================= */

  const deleteProperty = async (id: string) => {
    const prev = properties;
    setProperties((p) => p.filter((x) => x._id !== id));

    try {
      await axios.delete(`${API_BASE_URL}/api/property/${id}`);
      toast.success("Property deleted");
    } catch {
      toast.error("Delete failed");
      setProperties(prev); // rollback
    }
  };

  /* ================= STATUS TOGGLE ================= */

  const toggleStatus = async (p: Property) => {
    setProperties((prev) =>
      prev.map((x) => (x._id === p._id ? { ...x, status: !x.status } : x)),
    );

    try {
      await axios.patch(`${API_BASE_URL}/api/property/${p._id}/status`, {
        status: !p.status,
      });
    } catch {
      toast.error("Status update failed");
      fetchProperties();
    }
  };

  /* ================= FORM HELPERS ================= */

  const openEdit = (p: Property) => {
    setEditing(p);

    setForm({
      propertyName: p.propertyName,
      slug: p.slug,
      listingType: p.listingType,
      propertyType: p.propertyType,

      price: String(p.price),

      bedroom: String(p.bedroom),
      bathroom: String(p.bathroom),
      sizeSqft: String(p.sizeSqft),

      address: p.address,
      subArea: p.subArea || "",

      developerName: p.developerName,
      propertyDetails: p.propertyDetails,

      highlights: p.highlights?.join(", ") || "",
      featuresAmenities: p.featuresAmenities?.join(", ") || "",
      nearby: p.nearby?.join(", ") || "",
      extraHighlights: p.extraHighlights?.join(", ") || "",

      videoLink: p.videoLink || "",
      googleMapUrl: p.googleMapUrl || "",

      propertyImages: [],
      propertyBrochure: null,
    });

    setImages(
      p.propertyImages.map((url) => ({
        id: crypto.randomUUID(),
        type: "existing",
        url,
      })),
    );

    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);

    setForm({
      propertyName: "",
      slug: "",
      listingType: "buy",
      propertyType: "",

      price: "",

      bedroom: "",
      bathroom: "",
      sizeSqft: "",

      address: "",
      subArea: "",

      developerName: "",
      propertyDetails: "",

      highlights: "",
      featuresAmenities: "",
      nearby: "",
      extraHighlights: "",

      videoLink: "",
      googleMapUrl: "",

      propertyImages: [],
      propertyBrochure: null,
    });

    setImages([]);
    setBrochure(null);
  };

  const openDeleteConfirm = (property: Property) => {
    setSelectedProperty(property);
    setConfirmAction("delete");
    setConfirmOpen(true);
  };

  const openStatusConfirm = (property: Property) => {
    setSelectedProperty(property);
    setConfirmAction("status");
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedProperty(null);
    setConfirmAction(null);
  };

  const handleConfirm = async () => {
    if (!selectedProperty || !confirmAction) return;

    if (confirmAction === "delete") {
      await deleteProperty(selectedProperty._id);
    }

    if (confirmAction === "status") {
      await toggleStatus(selectedProperty);
    }

    closeConfirm();
  };

  /* ================= PAGINATED DATA ================= */

  const paginated = properties.slice(
    (page - 1) * PAGE_LIMIT,
    page * PAGE_LIMIT,
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Property Management</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          + Add new property
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Property Name</th>
              <th className="p-3 text-left">Listing Type</th>
              <th className="p-3">Property Type</th>
              <th className="p-3">No. of beds</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              paginated.map((p) => (
                <tr key={p._id} className="border-t border-gray-700">
                  <td className="p-3">{p.propertyName}</td>
                  <td className="p-3 capitalize">{p.listingType}</td>
                  <td className="p-3 capitalize">{p.propertyType}</td>
                  <td className="p-3 text-center">{p.bedroom}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        p.status ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {p.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2 justify-end">
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-blue-600 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openStatusConfirm(p)}
                      className="bg-yellow-600 px-2 py-1 rounded"
                    >
                      Status
                    </button>

                    <button
                      onClick={() => openDeleteConfirm(p)}
                      className="bg-red-600 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-indigo-600" : "bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-4xl border border-gray-800 overflow-y-auto max-h-[90vh]">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold">
                {editing ? "Edit Property" : "Add New Property"}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* FORM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PROPERTY NAME */}
                <input
                  placeholder="Property Name"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.propertyName}
                  onChange={(e) => {
                    const value = e.target.value;

                    setForm((prev) => ({
                      ...prev,
                      propertyName: value,
                      slug: editing ? prev.slug : generateSlug(value),
                    }));
                  }}
                />

                {/* PROPERTY TYPE */}
                <select
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.propertyType}
                  onChange={(e) =>
                    setForm({ ...form, propertyType: e.target.value })
                  }
                >
                  <option value="">Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Builder Floor">Builder Floor</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="FarmHouse">FarmHouse</option>
                </select>

                {/* SLUG */}
                <input
                  placeholder="Slug (auto-generated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: generateSlug(e.target.value) })
                  }
                />

                <select
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.listingType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      listingType: e.target.value as ListingType,
                    })
                  }
                >
                  <option value="buy">Buy</option>
                  {/* <option value="sell">Sell</option> */}
                  <option value="rent">Rent</option>
                  {/* <option value="offPlan">Off Plan</option> */}
                </select>

                <input
                  type="number"
                  placeholder="Bedrooms"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.bedroom}
                  onChange={(e) =>
                    setForm({ ...form, bedroom: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Bathrooms"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.bathroom}
                  onChange={(e) =>
                    setForm({ ...form, bathroom: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                  type="string"
                  placeholder="Size (sqft)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.sizeSqft}
                  onChange={(e) =>
                    setForm({ ...form, sizeSqft: e.target.value })
                  }
                />

                <input
                  type="string"
                  placeholder="Area"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.subArea}
                  onChange={(e) =>
                    setForm({ ...form, subArea: e.target.value })
                  }
                />

                <input
                  type="string"
                  placeholder="Address"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                <textarea
                  placeholder="Property Description"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2 md:col-span-2 min-h-[100px]"
                  value={form.propertyDetails}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      propertyDetails: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  placeholder="Highlights (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.highlights}
                  onChange={(e) =>
                    setForm({ ...form, highlights: e.target.value })
                  }
                />

                <textarea
                  placeholder="Features & Amenities (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.featuresAmenities}
                  onChange={(e) =>
                    setForm({ ...form, featuresAmenities: e.target.value })
                  }
                />

                <textarea
                  placeholder="Nearby (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.nearby}
                  onChange={(e) => setForm({ ...form, nearby: e.target.value })}
                />

                <textarea
                  placeholder="Extra Highlights (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.extraHighlights}
                  onChange={(e) =>
                    setForm({ ...form, extraHighlights: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Video / Reel Link"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.videoLink}
                  onChange={(e) =>
                    setForm({ ...form, videoLink: e.target.value })
                  }
                />

                <input
                  placeholder="Google Map URL"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.googleMapUrl}
                  onChange={(e) =>
                    setForm({ ...form, googleMapUrl: e.target.value })
                  }
                />
              </div>

              <input
                type="string"
                placeholder="Developer Name"
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                value={form.developerName}
                onChange={(e) =>
                  setForm({ ...form, developerName: e.target.value })
                }
              />

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Property Images
                </label>

                <input
                  type="file"
                  className="cursor-pointer"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImages(e.target.files)}
                />

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={() => (dragItem.current = index)}
                      onDragEnter={() => (dragOverItem.current = index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      className="relative group border border-gray-700 rounded-lg overflow-hidden"
                    >
                      <img
                        src={img.type === "existing" ? img.url : img.preview}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-1 right-1 bg-black/70 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Drag to reorder • Click ✕ to remove
                </p>
              </div>

              {/* BROCHURE UPLOAD */}
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Property Brochure (PDF • Max 10MB)
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > 10 * 1024 * 1024) {
                      alert("PDF must be less than 10MB");
                      return;
                    }

                    setBrochure(file);
                  }}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                />

                {brochure && (
                  <div className="mt-2 flex items-center justify-between bg-gray-800 border border-gray-700 rounded px-3 py-2">
                    <span className="text-sm text-gray-300 truncate">
                      📄 {brochure.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setBrochure(null)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
              <button
                onClick={closeForm}
                className="px-4 py-2 border border-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded"
              >
                {editing ? "Update Property" : "Create Property"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Models */}
      {confirmOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-lg font-semibold">
                {confirmAction === "delete"
                  ? "Delete Property"
                  : selectedProperty.status
                    ? "Deactivate Property"
                    : "Activate Property"}
              </h3>
            </div>

            <div className="p-5 text-sm text-gray-300 space-y-3">
              {confirmAction === "delete" ? (
                <p>
                  Are you sure you want to permanently delete
                  <span className="font-semibold text-white">
                    {" "}
                    {selectedProperty.propertyName}
                  </span>
                  ? This action cannot be undone.
                </p>
              ) : (
                <p>
                  Are you sure you want to{" "}
                  <span className="font-semibold text-white">
                    {selectedProperty.status ? "deactivate" : "activate"}
                  </span>{" "}
                  this property?
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-800">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 border border-gray-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded ${
                  confirmAction === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
