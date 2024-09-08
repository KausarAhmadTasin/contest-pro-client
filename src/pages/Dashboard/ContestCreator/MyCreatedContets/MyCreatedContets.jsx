import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";

const MyCreatedContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: contests = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading contests.</div>;
  }

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you realy want to delete this contest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/contests/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest Deleted!",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Could not delete!",
              customClass: {
                confirmButton: "bg-[#F97316]",
              },
            });
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>My Created Contests - ContestPro</title>
      </Helmet>
      <div className="pb-6 pt-2">
        <h1 className="text-2xl font-bold mb-4">My Created Contests</h1>

        {contests.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              You haven&apos;t added any contests yet.
            </p>
            <Link
              to="/dashboard/addContest"
              className="mt-4 inline-block bg-[#d48d5a] text-white py-2 px-4 rounded-md hover:bg-[#df9763] transition"
            >
              Add a Contest
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest) => (
              <div
                key={contest._id}
                className="border p-4 rounded-lg bg-white dark:bg-gray-800"
              >
                <img
                  src={contest.image}
                  alt={contest.contestName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {contest.contestName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {contest.contestDescription}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Prize: {contest.prizeMoney}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Deadline:{" "}
                  {new Date(contest.contestDeadline).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleDeleteClick(contest._id)}
                  className="btn mt-2 border-none hover:bg-red-400 bg-red-500 text-white"
                >
                  Delete <IoMdCloseCircleOutline className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCreatedContests;
