import { useEffect, useState } from "react";

interface ContactRequest {
  _id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  isVerified?: boolean;
}

const PAGE_LIMIT = 10;

const AdminContactRequest = () => {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [search, setSearch] = useState("");
  const [verified, setVerified] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState<{
    type: "delete" | "verify" | null;
    lead?: ContactRequest;
  }>({ type: null });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_LIMIT),
      });

      if (search) params.append("search", search);
      if (verified !== "all") params.append("verified", verified);

      const res = await fetch(
        `http://localhost:8000/api/notify/leads?${params.toString()}`,
      );
      const data = await res.json();

      setContacts(data.data || []);
      setTotalPages(data.pagination.pages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, verified]);

  const confirmDelete = async () => {
    if (!modal.lead) return;

    await fetch(`http://localhost:8000/api/notify/leads/${modal.lead._id}`, {
      method: "DELETE",
    });

    setContacts((prev) => prev.filter((c) => c._id !== modal.lead?._id));
    setModal({ type: null });
  };

  const confirmVerify = async () => {
    if (!modal.lead) return;

    await fetch(
      `http://localhost:8000/api/notify/leads/${modal.lead._id}/verify`,
      { method: "PATCH" },
    );

    setContacts((prev) =>
      prev.map((c) =>
        c._id === modal.lead?._id ? { ...c, isVerified: true } : c,
      ),
    );
    setModal({ type: null });
  };

  return (
    <div className="h-screen bg-black text-white font-raleway flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black p-4 sm:p-6 border-b border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Leads</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            placeholder="Search name, email or phone"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="bg-[#111] border border-gray-700 px-3 py-2 text-sm w-full sm:w-1/2"
          />

          <select
            value={verified}
            onChange={(e) => {
              setPage(1);
              setVerified(e.target.value);
            }}
            className="bg-[#111] border border-gray-700 px-3 py-2 text-sm sm:w-48"
          >
            <option value="all">All</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-400">No leads found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-700 text-sm">
              <thead className="bg-[#1e1e1e]">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className="even:bg-[#111] hover:bg-[#222]">
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">
                      {c.isVerified ? (
                        <span className="text-green-400 text-xs">
                          ✔ Verified
                        </span>
                      ) : (
                        <span className="text-yellow-400 text-xs">
                          ⏳ Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-3">
                      {!c.isVerified && (
                        <button
                          onClick={() => setModal({ type: "verify", lead: c })}
                          className="text-green-400 hover:text-green-600 text-xs uppercase"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => setModal({ type: "delete", lead: c })}
                        className="text-red-400 hover:text-red-600 text-xs uppercase"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border border-gray-700 disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-gray-400">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border border-gray-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111] border border-gray-700 p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-3">
              {modal.type === "delete" ? "Delete Lead?" : "Verify Lead?"}
            </h2>

            <p className="text-sm text-gray-400 mb-6">
              {modal.type === "delete"
                ? "This action cannot be undone."
                : "This will mark the user as verified."}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModal({ type: null })}
                className="px-4 py-2 border border-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={
                  modal.type === "delete" ? confirmDelete : confirmVerify
                }
                className={`px-4 py-2 ${
                  modal.type === "delete" ? "bg-red-600" : "bg-green-600"
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

export default AdminContactRequest;
