import { useSearchParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import "./AllContests.css";
import { IoMdOptions } from "react-icons/io";
import ContestCard from "../../components/shared/ContestCard/ContestCard";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams, setSearchParams] = useSearchParams();
  const [contestType, setContestType] = useState(
    searchParams.get("contestType") || ""
  );

  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ["Book Review", "Movie Review", "Article Writing", "Others"];

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-gray-300 to-[#c5f3d8] p-6 pt-28 relative">
        <div className="absolute inset-0 bg-black bg-opacity-25 pointer-events-none"></div>

        {/* Contest Type Filter */}
        <div className="relative z-10 mb-6">
          <label
            htmlFor="contestType"
            className="text-lg text-white font-semibold"
          >
            Filter by Contest Type:
          </label>
          <select
            id="contestType"
            value={contestType}
            onChange={(e) => setContestType(e.target.value)}
            className="ml-4 p-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow focus:ring focus:ring-purple-400"
          >
            <option value="">All</option>
            <option value="Book Review">Book Review</option>
            <option value="Movie Review">Movie Review</option>
            <option value="Article Writing">Article Writing</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Filter and contest cards */}
        <div className="flex md:flex-row flex-col justify-between gap-4">
          {/* Filter */}
          <div className="bg-gray-600 font-sans opacity-90 text-white w-full md:max-w-xs p-4 rounded-lg">
            <h3 className="flex justify-between text-xl font-semibold mb-6">
              Filters <IoMdOptions />
            </h3>
            <div className="space-y-2">
              {options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                    className="bg-white w-4 h-4 rounded-full border border-black checked:bg-blue-500 checked:border-blue-500"
                  />
                  <span className="font-medium">{option}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 text-white">
              <strong>Selected Options:</strong>{" "}
              <div className="border-2 border-gray-400 rounded-md px-3 py-2 min-h-24">
                {selectedOptions.join(", ") || "None"}
              </div>
            </div>
          </div>

          {/* contents */}
          <div className="flex-grow">
            {/* Loading State */}
            {isLoading ? (
              <p className="text-center text-gray-100">
                <span className="loading loading-dots loading-lg"></span>
              </p>
            ) : (
              // Cards
              <div className="border-2 border-white pl-3 py-2 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2 overflow-auto max-h-screen custom-scrollbar relative z-10">
                  {contests.map((contest) => (
                    <ContestCard key={contest._id} contest={contest} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllContests;
