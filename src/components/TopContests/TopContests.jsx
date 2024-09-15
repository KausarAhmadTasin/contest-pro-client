import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";

const TopContests = () => {
  const [activeTab, setActiveTab] = useState("Book Review");
  const axiosSecure = useAxiosSecure();

  const { data: contests = [] } = useQuery({
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
      {" "}
      <div className="md:container md:mx-auto mx-6 mt-10 md:mt-20">
        <h2 className="text-3xl text-gray-600 dark:text-gray-200 font-bold mb-10 text-center ">
          Top Contests
        </h2>

        {/* Tab System */}
        <div className="flex justify-center space-x-4 mb-6">
          {["Book Review", "Movie Review", "Article Writing", "Others"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Display filtered contests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContests.map((contest) => (
            <div
              key={contest._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={contest.image}
                alt={contest.contestName}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{contest.contestName}</h3>
              <p className="text-gray-600 mb-2">{contest.contestDescription}</p>
              <p className="font-semibold">Prize: {contest.prizeMoney}</p>
              <div className="flex justify-center w-full mt-4">
                <Link to={`/contestDetails/${contest._id}`}>
                  {" "}
                  <PrimaryBtn>Details</PrimaryBtn>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopContests;
