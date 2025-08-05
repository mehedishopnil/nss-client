import { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Loading from "../Loading";
import { Link, useNavigate } from "react-router-dom";
import GuardCard from "../GuardCard/GuardCard";

const PAGE_SIZE = 9; // Changed to multiple of 3 for better grid layout

const Guards = () => {
  // Context and state management
  const { allGuards, loading } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Process and prepare guard data for display
   * @returns {Array} Processed guards data with consistent structure
   */
  const processedGuards = useMemo(() => {
    if (!Array.isArray(allGuards)) return [];

    return allGuards.map((guard) => {
      return {
        _id: guard?._id || "",
        name: (guard?.name || "").toString(),
        phone: (guard?.phone || "").toString(),
        nid: (guard?.nid || "").toString(),
        // keep all other properties in case GuardCard expects them
        ...guard,
      };
    });
  }, [allGuards]);

  // Filter guards based on search term
  const filteredGuards = useMemo(() => {
    if (loading) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return processedGuards;

    return processedGuards.filter((guard) => {
      const nameMatch = guard.name?.toLowerCase().includes(term);
      const phoneMatch = guard.phone?.includes(term);
      const nidMatch = guard.nid?.includes(term);
      return nameMatch || phoneMatch || nidMatch;
    });
  }, [searchTerm, processedGuards, loading]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalGuards = filteredGuards.length;
  const totalPages = Math.ceil(totalGuards / PAGE_SIZE) || 1;

  const paginatedGuards = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredGuards.slice(start, start + PAGE_SIZE);
  }, [filteredGuards, currentPage]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handlePageClick = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">All Guards</h1>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, phone or NID..."
            className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
            aria-label="Search guards"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Guards Grid */}
      {paginatedGuards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedGuards.map((guard) => (
            <div
              
              key={guard._id}
              className="block transition-transform duration-200 hover:scale-[1.02]"
              aria-label={`View details for ${guard.name || "Guard"}`}
            >
              <GuardCard guard={guard} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          {searchTerm
            ? `No guards match "${searchTerm}".`
            : "No guards available."}
        </div>
      )}

      {/* Pagination Controls */}
      {totalGuards > PAGE_SIZE && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed dark:text-gray-500 dark:border-gray-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
            }`}
            aria-label="Previous page"
          >
            Previous
          </button>

          {/* Simple page number display: show up to 5 pages with current in middle if possible */}
          {(() => {
            const pages = [];
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);
            if (currentPage <= 2) {
              end = Math.min(5, totalPages);
            }
            if (currentPage >= totalPages - 1) {
              start = Math.max(1, totalPages - 4);
            }

            for (let p = start; p <= end; p++) {
              pages.push(
                <button
                  key={p}
                  onClick={() => handlePageClick(p)}
                  aria-current={p === currentPage ? "page" : undefined}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    p === currentPage
                      ? "bg-primary text-white border-primary"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
                  }`}
                >
                  {p}
                </button>
              );
            }
            return pages;
          })()}

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed dark:text-gray-500 dark:border-gray-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
            }`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Guards;