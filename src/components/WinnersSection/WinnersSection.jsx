import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WinnerSection = () => {
  const axiosSecure = useAxiosSecure();
  const [winnerStats, setWinnerStats] = useState({
    totalParticipants: 0,
    totalWinners: 0,
    participants: [],
    winners: [],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["winnerStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/participants/stats");
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      setWinnerStats(data);
    }
  }, [data]);

  return (
    <section className="relative md:container md:mx-auto mx-4 pb-16 pt-10 md:px-20 px-5 my-20 rounded-2xl bg-gray-200 dark:bg-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">
          Contest Winners
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get inspired by our latest contest winners and participate to win
          exciting prizes!
        </p>
      </div>

      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <span className="loading  loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {winnerStats.winners.map((winner, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {winner.contest_title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Winner: {winner.participant_email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Prize: ${winner.contest_prize}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400">
          Total Participants: {winnerStats.totalParticipants}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Total Winners: {winnerStats.totalWinners}
        </p>
        <Link to="/allContests">
          {" "}
          <button className="mt-6 px-6 py-3 bg-blue-500 dark:bg-blue-700 text-white rounded-md">
            Participate Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default WinnerSection;
