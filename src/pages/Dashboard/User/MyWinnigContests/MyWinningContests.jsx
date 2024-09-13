import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyWinningContests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: winningContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["winningContests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participants?participant=${user.email}&winner=true`
      );
      return res.data;
    },
    enabled: !!user.email, // Only run the query if the user email exists
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading winning contests.</div>;
  }

  if (winningContests.length === 0) {
    return <div>No winning contests found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>My Winning Contests - ContestPro</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 pt-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          My Winning Contests
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winningContests.map((contest) => (
            <div
              key={contest._id}
              className="bg-white flex flex-col dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex-grow">
                {" "}
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {contest.contest_title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Prize: {contest.contest_prize}
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                <span className="font-bold">Email of Contest Creator: </span>
                {contest.creator_email}
              </p>
              <p className="text-green-600 mt-4 dark:text-green-400 font-bold">
                You are the winner!
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyWinningContests;
