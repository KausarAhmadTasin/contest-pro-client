import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: contests = [] } = useQuery({
    queryKey: "contests",
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      return res.data;
    },
  });

  console.log(contests);

  return (
    <>
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">All Contests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start"
            >
              <img
                src={contest.image}
                alt={contest.contestName}
                className="w-full h-40 object-cover rounded-lg mb-4"
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllContests;
