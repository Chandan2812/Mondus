import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type ListingType = "buy" | "sell" | "rent" | "offPlan";

interface Property {
  _id: string;
  propertyName: string;
  listingType: ListingType;
  propertyType: string;
  propertyDetails: string;
  address: string;
  subArea: string;
  bedroom: number;
  bathroom: number;
  sizeSqft: number;
  status: boolean;
  propertyImages: string[];
  createdAt: string;
}

interface PropertyForm {
  propertyName: string;
  listingType: ListingType;
  propertyType: string;
  address: string;
  subArea: string;
  bedroom: string;
  bathroom: string;
  sizeSqft: string;
  propertyDetails: string;
  propertyImages: File[];
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
    listingType: "buy",
    propertyType: "",
    subArea: "",
    address: "",
    bedroom: "",
    bathroom: "",
    sizeSqft: "",
    propertyDetails: "",
    propertyImages: [],
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

  //   const handleSubmit = async () => {
  //     try {
  //       const formData = new FormData();

  //       Object.entries(form).forEach(([key, value]) => {
  //         if (key !== "propertyImages") {
  //           formData.append(key, value as string);
  //         }
  //       });

  //       form.propertyImages.forEach((img) =>
  //         formData.append("propertyImages", img),
  //       );

  //       if (editing) {
  //         /* ===== OPTIMISTIC UPDATE ===== */
  //         const optimistic = properties.map((p) =>
  //           p._id === editing._id ? { ...p, propertyName: form.propertyName } : p,
  //         );
  //         setProperties(optimistic);

  //         await axios.put(
  //           `${API_BASE_URL}/api/property/${editing._id}`,
  //           formData,
  //         );
  //         toast.success("Property updated");
  //       } else {
  //         const res = await axios.post(`${API_BASE_URL}/api/property`, formData);
  //         setProperties([res.data.data, ...properties]);
  //         toast.success("Property created");
  //       }

  //       closeForm();
  //     } catch {
  //       toast.error("Operation failed");
  //       fetchProperties(); // rollback
  //     }
  //   };

  const handleSubmit = async () => {
    try {
      if (images.length === 0) {
        toast.error("At least one image is required");
        return;
      }

      if (
        !form.propertyName ||
        !form.propertyType ||
        !form.address ||
        !form.propertyDetails
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();

      formData.append("propertyName", form.propertyName);
      formData.append("listingType", form.listingType);
      formData.append("propertyType", form.propertyType);
      formData.append("address", form.address);
      formData.append("subArea", form.subArea);
      formData.append("propertyDetails", form.propertyDetails);

      // ✅ Convert numbers properly
      formData.append("bedroom", String(Number(form.bedroom)));
      formData.append("bathroom", String(Number(form.bathroom)));
      formData.append("sizeSqft", String(Number(form.sizeSqft)));

      // ✅ Send images correctly
      images.forEach((img) => {
        if (img.type === "new") {
          formData.append("propertyImages", img.file);
        }
      });

      if (editing) {
        await axios.put(
          `${API_BASE_URL}/api/property/${editing._id}`,
          formData,
        );
        toast.success("Property updated");
      } else {
        await axios.post(`${API_BASE_URL}/api/property`, formData);
        toast.success("Property created");
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

  //   const openEdit = (p: Property) => {
  //     setEditing(p);
  //     setForm({
  //       propertyName: p.propertyName,
  //       listingType: p.listingType,
  //       propertyType: p.propertyType,
  //       address: p.address,
  //       subArea: p.subArea,
  //       bedroom: String(p.bedroom),
  //       bathroom: String(p.bathroom),
  //       sizeSqft: String(p.sizeSqft),
  //       propertyDetails: String(p.propertyDetails),
  //       propertyImages: [],
  //     });
  //     setFormOpen(true);
  //   };

  const openEdit = (p: Property) => {
    setEditing(p);

    setForm({
      propertyName: p.propertyName,
      listingType: p.listingType,
      propertyType: p.propertyType,
      address: p.address,
      subArea: p.subArea || "",
      bedroom: String(p.bedroom),
      bathroom: String(p.bathroom),
      sizeSqft: String(p.sizeSqft),
      propertyDetails: p.propertyDetails,
      propertyImages: [],
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
      listingType: "buy",
      propertyType: "",
      subArea: "",
      address: "",
      bedroom: "",
      bathroom: "",
      sizeSqft: "",
      propertyDetails: "",
      propertyImages: [],
    });
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
                      onClick={() => toggleStatus(p)}
                      className="bg-yellow-600 px-2 py-1 rounded"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => deleteProperty(p._id)}
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
                {[
                  ["Property Name", "propertyName"],
                  ["Property Type", "propertyType"],
                ].map(([label, key]) => (
                  <input
                    key={key}
                    placeholder={label}
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                    value={(form as any)[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  />
                ))}

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
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                  <option value="offPlan">Off Plan</option>
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
                  type="string"
                  placeholder="Size"
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
                  placeholder="Property Details"
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

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Property Images
                </label>

                <input
                  type="file"
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
    </div>
  );
};

export default PropertyManagement;
