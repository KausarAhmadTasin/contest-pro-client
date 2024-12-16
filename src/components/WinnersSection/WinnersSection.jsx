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
    <section className="relative select-none md:container md:mx-auto mx-4 pb-16 pt-10 md:px-20 px-5 my-14 rounded-2xl bg-gradient-to-br from-[#1F2A40] to-[#2D4059] dark:from-gray-800 dark:to-gray-900 text-white shadow-2xl">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 text-white">
          Contest Winners
        </h2>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
          Get inspired by our latest contest winners and participate to win
          exciting prizes! Show your skills and be the next name on this list.
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="grid justify-center items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {winnerStats.winners.map((winner, index) => (
            <div
              key={index}
              className="relative bg-white font-sans dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-start justify-between space-y-4 border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {winner.contest_title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Winner:{" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-300 text-lg">
                  {winner.participant_name}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Prize:{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-300">
                  ${winner.contest_prize}
                </span>
              </p>
              <div className="absolute -top-3 -right-6 bg-indigo-600 dark:bg-indigo-700 text-white px-3 py-1 text-sm rounded-full shadow-md">
                #{index + 1}
              </div>
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-900 opacity-20"></div>
            </div>
          ))}
        </div>
      )}

      {/* Stats and CTA */}
      <div className="text-center font-sans mt-12 space-y-3">
        <p className="text-lg text-gray-300">
          Total Participants:{" "}
          <span className="font-bold text-indigo-400 dark:text-indigo-300">
            {winnerStats.totalParticipants}
          </span>
        </p>
        <p className="text-lg text-gray-300">
          Total Winners:{" "}
          <span className="font-bold text-indigo-400 dark:text-indigo-300">
            {winnerStats.totalWinners}
          </span>
        </p>
        <Link to="/allContests">
          <button className="bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-purple-800 text-white font-medium py-2 px-6 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105 mt-10">
            Participate Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default WinnerSection;
