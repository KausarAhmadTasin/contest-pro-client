import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ContestCard from "../shared/ContestCard/ContestCard";

const TopContests = () => {
  const [activeTab, setActiveTab] = useState("Others");
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests?top");
      return res.data;
    },
  });

  const filteredContests = contests.filter((contest) => {
    if (activeTab === "Others") {
      return !["Book Review", "Movie Review", "Article Writing"].includes(
        contest.contestType
      );
    }
    return contest.contestType === activeTab;
  });

  return (
    <>
      <div className="relative bg-gray-400">
        {/* Blurry Background Layers */}
        <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-green-600 to-indigo-800 opacity-25 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gray-900 opacity-50 backdrop-blur-3xl"></div>

        {/* Content */}
        <div className="relative md:container md:mx-auto mx-6 py-10">
          <h2 className="text-4xl text-gray-100 dark:text-gray-200 mb-10 text-center">
            Top Contests
          </h2>

          {/* Tab System */}
          <div className="flex justify-center space-x-2 text-base md:space-x-4 mb-6">
            {["Book Review", "Movie Review", "Article Writing", "Others"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
        ${
          activeTab === tab
            ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md transform scale-105"
            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:shadow-md"
        }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          {/* Loading State */}
          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              <span className="loading loading-dots loading-lg"></span>
            </p>
          ) : isError ? (
            <p className="text-center text-red-500">Failed to load contests.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContests.map((contest) => (
                <ContestCard key={contest._id} contest={contest} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopContests;
