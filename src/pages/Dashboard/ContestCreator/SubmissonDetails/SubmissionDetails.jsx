import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PrimaryBtn from "../../../../components/PrimaryBtn/PrimaryBtn";
import { GiTrophy } from "react-icons/gi";
import Swal from "sweetalert2";

const SubmissionDetails = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  // Extract contestId from the query parameters
  const searchParams = new URLSearchParams(location.search);
  const contestTitle = searchParams.get("contest_title");

  const {
    data: participants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["participants", contestTitle],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participants?contest_title=${contestTitle}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  console.log(participants);

  const handleWinnerClick = async (id) => {
    try {
      const res = await axiosSecure.patch(`/participants/${id}`);
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          customClass: {
            confirmButton: "bg-[#F97316]",
          },
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-5">
      <Helmet>
        <title>Submission Details - ContestPro</title>
      </Helmet>

      {/* Contest Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        {participants.length > 0
          ? participants[0].contest_title
          : "Submission Details"}
      </h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Participant Name
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Participant Email
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Submitted Link
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                    {participant.participant_name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                    {participant.participant_email}
                  </td>
                  <td className="py-4 px-6 text-sm text-blue-600 dark:text-blue-400 underline">
                    <a
                      href={participant.task_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Submission
                    </a>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {participant.isWinner ? (
                      <p className="text-gray-500 flex items-center gap-2 text-base">
                        <GiTrophy className="text-yellow-500" />
                        Winner
                      </p>
                    ) : (
                      <button
                        onClick={() => handleWinnerClick(participant._id)}
                      >
                        <PrimaryBtn>Declare Winner</PrimaryBtn>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
