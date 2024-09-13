import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../providers/AuthProvider";

const MyParticipatedContests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: participatedContests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participatedContests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participants?participant=${user.email}`
      );
      return res.data;
    },
    enabled: !!user.email, // Enable query only if email exists
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading your participated contests.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        My Participated Contests
      </h1>
      {participatedContests.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-400">
          You have not participated in any contests.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {participatedContests.map((contest) => (
            <div
              key={contest._id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {contest.contest_title}
              </h2>
              <p className="text-gray-700 dark:text-gray-400 mb-2">
                <span className="font-bold">Prize: </span>
                {contest.contest_prize}
              </p>
              <p
                className={`text-lg font-semibold ${
                  contest.isWinner ? "text-green-500" : "text-red-500"
                }`}
              >
                {contest.isWinner
                  ? "Congratulations! You are the winner."
                  : "You did not win this contest."}
              </p>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                <span className="font-bold">Email of Contest Creator: </span>
                {contest.creator_email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyParticipatedContests;
