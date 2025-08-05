import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiCreditCard,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";

const GuardCard = ({ guard = {}, onClick, formatDate }) => {
  const {
    _id,
    name = "Unnamed Guard",
    joinDate,
    phone = "N/A",
    nid = "N/A",
    address = "No address provided",
    dutyPlace = "N/A",
    dutyTime,
    lastSalary = 0,
    lastAdvance = 0,
    presence = [],
    photoUrl,
  } = guard;

  console.log(guard.joinDate);

  // Calculate presence status
  const latestStatus =
    presence.length > 0 ? presence[presence.length - 1].status : "unknown";

  // Status colors
  const statusColors = {
    present: "bg-emerald-100 text-emerald-800",
    absent: "bg-rose-100 text-rose-800",
    late: "bg-amber-100 text-amber-800",
    unknown: "bg-gray-100 text-gray-800",
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
    >
      <Link
        to={`/admin-panel/single-guard/${_id}`}
        onClick={onClick}
        className="block group"
        aria-label={`View details for ${name}`}
      >
        <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-100">
          {/* Status ribbon */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${statusColors[latestStatus]}`}
          >
            {latestStatus.charAt(0).toUpperCase() + latestStatus.slice(1)}
          </div>

          {/* Profile header with photo */}
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 h-16">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="absolute -bottom-8 left-4 w-16 h-16 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="absolute -bottom-8 left-4 w-16 h-16 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center">
                
                {name?.charAt(0) || <FiUser className="w-6 h-6 text-indigo-600" />}
              </div>
            )}
          </div>

          {/* Card body */}
          <div className="pt-10 px-5 pb-5">
            {/* Name and join date */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900 truncate max-w-[70%]">
                {name}
              </h2>
              <div className="text-xs text-gray-500 flex items-center">
                <FiCalendar className="mr-1" />
                {joinDate ? joinDate.split("T")[0] : "N/A"}
              </div>
            </div>

            {/* Details list */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-8 flex-shrink-0 text-gray-400">
                  <FiPhone />
                </div>
                <div className="truncate" title={phone}>
                  {phone}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 flex-shrink-0 text-gray-400">
                  <FiCreditCard />
                </div>
                <div className="truncate" title={`NID: ${nid}`}>
                  NID: {nid}
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 flex-shrink-0 text-gray-400 pt-0.5">
                  <FiMapPin />
                </div>
                <div className="truncate" title={address}>
                  {address}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 flex-shrink-0 text-gray-400">
                  <FiClock />
                </div>
                <div className="truncate">
                  {dutyPlace} • {dutyTime}
                </div>
              </div>
            </div>

            {/* View button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="w-full py-2 bg-gradient-to-r from-orange-400 to-purple-600 text-white rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <span>View Details</span>
                <FiTrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

GuardCard.propTypes = {
  guard: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  formatDate: PropTypes.func,
};

export default GuardCard;
