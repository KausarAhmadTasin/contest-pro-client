import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

const SubmittedContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants?creator=${user?.email}`);
      return res.data;
    },
  });

  const handleViewDetails = (contestTitle) => {
    navigate(`/dashboard/submissionDetails?contest_title=${contestTitle}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-6">
      <Helmet>
        <title>My Contests - ContestPro</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
        My Contests
      </h1>

      <div className="overflow-x-auto">
        {contests.length > 0 ? (
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Contest Name
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Prize
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                    <div
                      onClick={() => {
                        handleViewDetails(contest._id);
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <p className="hover:underline flex-grow text-base font-semibold underline-offset-3">
                        {contest.contest_title}
                      </p>
                      <p className="flex hover:-translate-y-1 text-sky-500 duration-200 items-center justify-between cursor-pointer gap-x-1">
                        View Submission Details{" "}
                        <MdArrowOutward className="mb-1" />
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                    {contest.contest_prize}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                    {contest.transaction_id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center my-10 text-gray-500">
            You don&apos;t have any submitted contests!
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmittedContests;
