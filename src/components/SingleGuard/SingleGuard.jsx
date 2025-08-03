import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../Loading";
import toast from "react-hot-toast";

const SingleGuard = () => {
  const {
    allGuards,
    loading,
    addGuardTransaction,
    recordGuardPresence,
    updateGuardInfo,
  } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [guard, setGuard] = useState(null);
  const [newAdvance, setNewAdvance] = useState("");
  const [todayPresence, setTodayPresence] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (allGuards && id) {
      const foundGuard = allGuards.find((g) => g._id === id);
      setGuard(foundGuard);

      // Check today's presence status if presence data exists
      if (foundGuard?.presence) {
        const today = format(new Date(), "yyyy-MM-dd");
        const todayRecord = foundGuard.presence.find(
          (p) => format(new Date(p.date), "yyyy-MM-dd") === today
        );
        setTodayPresence(todayRecord?.status || null);
      }
    }
  }, [allGuards, id]);

  if (loading) return <Loading />;
  if (!guard) return <div className="text-center py-12">Guard not found</div>;

  // Calculate financial summaries
  const totalSalary =
    guard.transactions
      ?.filter((t) => t.type === "salary")
      .reduce((sum, t) => sum + t.amount, 0) || 0;

  const totalAdvances =
    guard.transactions
      ?.filter((t) => t.type === "advance")
      .reduce((sum, t) => sum + t.amount, 0) || 0;

  const totalDeposits =
    guard.transactions
      ?.filter((t) => t.type === "deposit")
      .reduce((sum, t) => sum + t.amount, 0) || 0;

  const netBalance = totalSalary - (totalAdvances - totalDeposits);

  // Calculate presence stats
  const presenceRecords = guard.presence || [];
  const totalPresent = presenceRecords.filter(
    (p) => p.status === "present"
  ).length;
  const totalAbsent = presenceRecords.filter(
    (p) => p.status === "absent"
  ).length;
  const presencePercentage =
    presenceRecords.length > 0
      ? Math.round((totalPresent / presenceRecords.length) * 100)
      : 0;

  //   Add Advance ::
  const handleAddAdvance = async (e) => {
    e.preventDefault();
    if (!newAdvance || isNaN(newAdvance)) return;

    setIsSubmitting(true);
    try {
      const transactionData = {
        type: "advance",
        amount: Number(newAdvance),
        note: "Advance payment",
        // date will be automatically set by backend
      };

      // Call the AuthContext function to update database
      const updatedGuard = await addGuardTransaction(
        guard._id,
        transactionData
      );

      // Update local state with the returned data
      setGuard(updatedGuard);
      setNewAdvance("");
    } catch (error) {
      console.error("Failed to add advance:", error);
      // You might want to show a toast/alert here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Presence Update::
  const handleMarkPresence = async (status) => {
    setIsSubmitting(true);
    try {
      const presenceData = {
        date: new Date().toISOString(), // Send as ISO string
        status: status,
      };

      // Call the AuthContext function to update database
      const updatedGuard = await recordGuardPresence(guard._id, presenceData);

      // Update local state with the returned data
      setGuard(updatedGuard);
      setTodayPresence(status);
    } catch (error) {
      console.error("Failed to update presence:", error);
      // You might want to show a toast/alert here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Guard Info::
  const handleUpdateGuardInfo = async (updatedFields) => {
    setIsSubmitting(true);
    try {
      // Call the AuthContext function to update database
      const updatedGuard = await updateGuardInfo(guard._id, updatedFields);

      // Update local state with the returned data
      setGuard(updatedGuard);
      return updatedGuard;
    } catch (error) {
      console.error("Failed to update guard info:", error);
      throw error; // Re-throw to handle in the calling component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {guard.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">ID: {guard._id}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate(`/admin-panel/guard-transactions/${guard._id}`)
            }
            className="btn btn-outline btn-primary"
          >
            View All Transactions
          </button>
          <button
            onClick={() => navigate(`/admin-panel/guard-presence/${guard._id}`)}
            className="btn btn-outline btn-secondary"
          >
            View Full Presence
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl">Basic Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{guard.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">NID</p>
                  <p className="font-medium">{guard.nid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{guard.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">
                    {guard.joinDate
                      ? format(new Date(guard.joinDate), "MMMM d, yyyy")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Duty Information */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  const newPlace = prompt(
                    "Enter new duty place:",
                    guard.dutyPlace
                  );
                  if (newPlace) {
                    handleUpdateGuardInfo({ dutyPlace: newPlace });
                  }
                }}
              >
                Edit
              </button>
            </div>
            <div className="card-body">
              <h2 className="card-title text-xl">Duty Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Duty Place</p>
                  <p className="font-medium">{guard.dutyPlace}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duty Time</p>
                  <p className="font-medium">{guard.dutyTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Financial */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl">Financial Summary</h2>
              <div className="space-y-4">
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Total Salary</div>
                    <div className="stat-value text-primary">
                      ৳{totalSalary}
                    </div>
                  </div>
                </div>
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Total Advances</div>
                    <div className="stat-value text-secondary">
                      ৳{totalAdvances}
                    </div>
                  </div>
                </div>
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Total Deposits</div>
                    <div className="stat-value text-accent">
                      ৳{totalDeposits}
                    </div>
                  </div>
                </div>
                <div className="stats shadow w-full bg-success text-success-content">
                  <div className="stat">
                    <div className="stat-title">Net Balance</div>
                    <div className="stat-value">৳{netBalance}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Advance Form */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl">Add Advance</h2>
              <form onSubmit={handleAddAdvance}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Amount (৳)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="input input-bordered"
                    value={newAdvance}
                    onChange={(e) => setNewAdvance(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Add Advance"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Presence */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl">Presence Tracking</h2>
              <div className="space-y-4">
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Total Present</div>
                    <div className="stat-value text-success">
                      {totalPresent}
                    </div>
                  </div>
                </div>
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Total Absent</div>
                    <div className="stat-value text-error">{totalAbsent}</div>
                  </div>
                </div>
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Presence Rate</div>
                    <div className="stat-value">{presencePercentage}%</div>
                  </div>
                </div>

                {/* Today's Presence */}
                <div className="mt-6">
                  <h3 className="font-medium mb-3">
                    Today's Status ({format(new Date(), "MMMM d, yyyy")})
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleMarkPresence("present")}
                      className={`btn flex-1 ${
                        todayPresence === "present"
                          ? "btn-success"
                          : "btn-outline"
                      }`}
                      disabled={isSubmitting || todayPresence === "present"}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleMarkPresence("absent")}
                      className={`btn flex-1 ${
                        todayPresence === "absent" ? "btn-error" : "btn-outline"
                      }`}
                      disabled={isSubmitting || todayPresence === "absent"}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guard.transactions?.slice(0, 3).map((txn, index) => (
                      <tr key={index}>
                        <td>{format(new Date(txn.date), "MMM d, yyyy")}</td>
                        <td>
                          <span
                            className={`badge ${
                              txn.type === "salary"
                                ? "badge-primary"
                                : txn.type === "advance"
                                ? "badge-secondary"
                                : "badge-accent"
                            }`}
                          >
                            {txn.type}
                          </span>
                        </td>
                        <td>৳{txn.amount}</td>
                      </tr>
                    ))}
                    {(!guard.transactions ||
                      guard.transactions.length === 0) && (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-4 text-gray-500"
                        >
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {guard.transactions?.length > 3 && (
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/admin-panel/guard-transactions/${guard._id}`}
                    className="link link-primary"
                  >
                    View All Transactions →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGuard;
