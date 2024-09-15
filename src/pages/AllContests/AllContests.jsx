import { Link, useSearchParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { useState, useEffect } from "react";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams, setSearchParams] = useSearchParams();
  const [contestType, setContestType] = useState(
    searchParams.get("contestType") || ""
  );

  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contests", contestType],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contests?contestType=${contestType}`);
      return res.data;
    },
  });

  useEffect(() => {
    setSearchParams({ contestType });
    refetch();
  }, [contestType, setSearchParams, refetch]);

  return (
    <>
      <Helmet>
        <title>All Contests - Contest Pro</title>
      </Helmet>
      <div className="min-h-screen text-gray-600 dark:text-gray-300 p-6 dark:bg-[#2f2f30]">
        <h1 className="text-2xl font-bold mb-4">All Contests</h1>

        {/* Contest Type Filter */}
        <div className="mb-6">
          <label htmlFor="contestType" className="text-lg font-semibold">
            Filter by Contest Type:
          </label>
          <select
            id="contestType"
            value={contestType}
            onChange={(e) => setContestType(e.target.value)}
            className="ml-4 p-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">All</option>
            <option value="Book Review">Book Review</option>
            <option value="Movie Review">Movie Review</option>
            <option value="Article Writing">Article Writing</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            <span className="loading loading-dots loading-lg"></span>
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1F2937] shadow-md rounded-lg p-4 flex flex-col items-start"
              >
                <img
                  src={contest.image}
                  alt={contest.contestName}
                  className="w-full object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2">
                  {contest.contestName}
                </h2>
                <p className="text-sm mb-2">{contest.contestDescription}</p>
                <p className="text-sm font-semibold mb-2">
                  Prize Money:{" "}
                  <span className="font-bold">{contest.prizeMoney}</span>
                </p>
                <p className="text-sm mb-2">
                  Price:{" "}
                  <span className="font-bold">{contest.contestPrice} USD</span>
                </p>
                <p className="text-sm mb-2">
                  Deadline:{" "}
                  <span className="font-bold">
                    {new Date(contest.contestDeadline).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm mb-2">
                  Task Submission:{" "}
                  <span className="font-bold">
                    {contest.taskSubmissionInstructions}
                  </span>
                </p>
                <p className="text-sm">
                  Contest Type:{" "}
                  <span className="font-bold">{contest.contestType}</span>
                </p>
                <div className="flex justify-center w-full mt-4">
                  <Link to={`/contestDetails/${contest._id}`}>
                    <PrimaryBtn>Details</PrimaryBtn>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllContests;
