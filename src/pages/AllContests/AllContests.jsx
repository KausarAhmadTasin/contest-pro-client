import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      return res.data;
    },
  });

  return (
    <>
      <div className="min-h-screen p-6 dark:bg-[#2f2f30]">
        <h1 className="text-2xl font-bold mb-4">All Contests</h1>
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
              <h2 className="text-xl font-semibold mb-2">
                {contest.contestName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {contest.contestDescription}
              </p>
              <p className="text-sm font-semibold mb-2">
                Prize Money: {contest.prizeMoney}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Price: {contest.contestPrice} USD
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Deadline:{" "}
                {new Date(contest.contestDeadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Task Submission: {contest.taskSubmissionInstructions}
              </p>
              <p className="text-sm text-gray-400">
                Contest Type: {contest.contestType}
              </p>
              <div className="flex justify-center w-full mt-4">
                <Link to={`/contestDetails/${contest._id}`}>
                  {" "}
                  <button className="btn bg-[#F97316] hover:bg-[#f39b5b] border-none text-white">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllContests;
