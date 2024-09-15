import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { Helmet } from "react-helmet";

const ContestDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const currentDate = new Date();

  const {
    data: contest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const contestDeadline = new Date(contest?.contestDeadline);

  const isDeadlineOver = currentDate.getTime() > contestDeadline.getTime();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-200">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading contest details.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contest Details - ContestPro</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={contest.image}
              alt={contest.contestName}
              className="w-full h-72 object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white px-4 text-center">
                {contest.contestName}
              </h1>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                  <span className="font-bold">Description: </span>
                  {contest.contestDescription}
                </p>
                <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                  <span className="font-bold">Prize Money: </span>
                  {contest.prizeMoney}
                </p>
                <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                  <span className="font-bold">Contest Price: </span>$
                  {contest.contestPrice}
                </p>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                  <span className="font-bold">Type: </span>
                  {contest.contestType}
                </p>
                <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                  <span className="font-bold">Deadline: </span>
                  {new Date(contest.contestDeadline).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                  <span className="font-bold">Submission Instructions: </span>
                  {contest.taskSubmissionInstructions}
                </p>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Created By
              </h2>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                <span className="font-bold">Name: </span>
                {contest.creator.name}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                <span className="font-bold">Email: </span>
                {contest.creator.email}
              </p>
            </div>

            <div className="flex w-full justify-center mt-8">
              {isDeadlineOver ? (
                <p className="text-red-500 font-bold text-xl">
                  The deadline has passed, you can no longer register.
                </p>
              ) : (
                <Link
                  state={{ price: contest.contestPrice, contest: contest }}
                  to="/dashboard/payment"
                >
                  <PrimaryBtn>Pay to Register</PrimaryBtn>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestDetail;
