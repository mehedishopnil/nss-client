import PropTypes from "prop-types";

/**
 * Simple date formatter fallback: formats ISO / timestamp to "MMM d, yyyy"
 * e.g., "2024-08-03T12:00:00Z" => "Aug 3, 2024"
 */
const defaultFormatDate = (iso) => {
  if (!iso) return "N/A";
  try {
    const d = new Date(iso);
    if (isNaN(d)) return "Invalid date";
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const GuardCard = ({ guard = {}, onClick, formatDate = defaultFormatDate }) => {
  const {
    name = "Unnamed Guard",
    joinDate,
    phone = "N/A",
    nid = "N/A",
    address = "No address provided",
    dutyPlace = "N/A",
    dutyTime = "N/A",
    lastSalary = "0",
    lastAdvance = "0",
  } = guard;

  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/20"
      aria-label={`View details for ${name}`}
    >
      <div className="card-body p-5">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <h2
            className="card-title text-lg md:text-xl truncate max-w-[180px]"
            title={name}
          >
            {name}
          </h2>
          <span className="badge badge-primary badge-sm md:badge-md">
            Joined: {formatDate(joinDate)}
          </span>
        </div>

        <div className="divider my-1" />

        {/* Basic Info Section */}
        <div className="space-y-2 text-sm md:text-base">
          <p className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{phone}</span>
          </p>
          <p className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>NID: {nid}</span>
          </p>
          <p className="flex items-start gap-1">
            <svg
              className="w-4 h-4 text-gray-500 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="flex-1 truncate" title={address}>
              {address}
            </span>
          </p>
          <p className="flex items-start gap-1">
            <svg
              className="w-4 h-4 text-gray-500 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="flex-1 truncate">
              {dutyPlace} ({dutyTime})
            </span>
          </p>
        </div>

        <div className="divider my-1" />

        {/* Financial Summary Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="stat p-2 bg-base-200 rounded-lg flex-1">
            <div className="stat-title text-xs md:text-sm">
              Last Salary
            </div>
            <div className="stat-value text-sm md:text-base">
              {lastSalary} BDT
            </div>
          </div>
          <div className="stat p-2 bg-base-200 rounded-lg flex-1">
            <div className="stat-title text-xs md:text-sm">
              Last Advance
            </div>
            <div className="stat-value text-sm md:text-base">
              {lastAdvance} BDT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default GuardCard;
