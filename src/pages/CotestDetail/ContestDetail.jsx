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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading contest details.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Contest Details - ContestPro</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <img
            src={contest.image}
            alt={contest.contestName}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {contest.contestName}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
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
          <div className="flex w-full justify-center mt-5">
            {isDeadlineOver ? (
              <p className="text-red-500 font-bold">
                The deadline has passed, you can no longer register.
              </p>
            ) : (
              <div className="flex w-full justify-center mt-5">
                <Link
                  state={{ price: contest.contestPrice, contest: contest }}
                  to="/dashboard/payment"
                >
                  <PrimaryBtn>Pay to register</PrimaryBtn>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestDetail;
