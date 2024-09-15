import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: pendingContests = [],
    isLoading: isLoadingPending,
    refetch,
  } = useQuery({
    queryKey: ["contests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests?isPending=true");
      return res.data;
    },
  });

  const {
    data: approvedContests = [],
    isLoading: isLoadingApproved,
    refetch: refetchApproved,
  } = useQuery({
    queryKey: ["contests", "approved"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests?isPending=false");
      return res.data;
    },
  });

  const handleApprove = async (contestId) => {
    try {
      await axiosSecure.patch(`/contests/approve/${contestId}`).then((res) => {
        if (res.data) {
          toast.success(res.data.message);
          refetch();
          refetchApproved();
        }
      });
    } catch (error) {
      console.log("Failed to approve contest", error);
      toast.error("Failed to approve contest");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 pt-4">
        <Helmet>
          <title>Manage Contests - ContestPro</title>
        </Helmet>

        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
          Manage Contests
        </h1>

        {/* Pending Contests Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Pending Contests
          </h2>

          {isLoadingPending ? (
            <p className="text-center text-gray-500">
              <span className="loading loading-dots loading-lg"></span>
            </p>
          ) : pendingContests.length > 0 ? (
            <div className="space-y-4">
              {pendingContests.map((contest) => (
                <div
                  key={contest._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {contest.contestName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Prize: {contest.prizeMoney}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Contest Creator:{" "}
                      <span className="font-semibold">
                        {contest.creator.name}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleApprove(contest._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending contests to approve.</p>
          )}
        </section>

        {/* Approved Contests Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Approved Contests
          </h2>

          {isLoadingApproved ? (
            <p className="text-center text-gray-500">
              <span className="loading loading-dots loading-lg"></span>
            </p>
          ) : approvedContests.length > 0 ? (
            <div className="space-y-4">
              {approvedContests.map((contest) => (
                <div
                  key={contest._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {contest.contestName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Prize: {contest.prizeMoney}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Contest Creator:{" "}
                    <span className="font-semibold">
                      {contest.creator.name}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No approved contests available.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default ManageContests;
