import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import "./ContestDetail.css";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

const ContestDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    user: { email },
  } = useContext(AuthContext);
  const currentDate = new Date();

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  console.log(rating, email, id);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data;
    },
  });

  const {
    data: contest,
    isLoading,
    isError,
    refetch: contestRefetch,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleRatingSubmit = async () => {
    try {
      if (rating && email) {
        const res = await axios.patch("http://localhost:5000/contests/rating", {
          rating: rating,
          id: id,
          participant_email: email,
        });
        if (res.data.modifiedCount) {
          toast.success("Rating given");
          contestRefetch();
        }
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(error.response.data.message);
    }
  };

  const averageRating =
    contest?.ratings?.length > 1
      ? contest.ratings.reduce((acc, rating) => acc + rating, 0) /
        (contest.ratings.length - 1)
      : 0;

  const contestDeadline = new Date(contest?.contestDeadline);
  const isDeadlineOver = currentDate.getTime() > contestDeadline.getTime();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-200">
        <span className="loading loading-dots loading-lg"></span>
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
      <div className="container mx-auto px-4 py-8 pt-28 font-sans">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header Image with Overlay */}
          <div className="relative">
            <img
              src={contest.image}
              alt={contest.contestName}
              className="w-full h-72 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
              <h1 className="text-4xl font-extrabold text-white text-center px-4">
                {contest.contestName}
              </h1>
            </div>
          </div>

          {/* Contest Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-800 dark:text-gray-400 text-lg mb-4">
                  <span className="font-semibold">Description:</span>{" "}
                  {contest.contestDescription}
                </p>
                <p className="text-gray-800 dark:text-gray-400 text-lg mb-4">
                  <span className="font-semibold">Prize Money:</span> $
                  {contest.prizeMoney}
                </p>
                <p className="text-gray-800 dark:text-gray-400 text-lg mb-4">
                  <span className="font-semibold">Contest Price:</span> $
                  {contest.contestPrice}
                </p>
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400 text-lg mb-4">
                  <span className="font-semibold">Type:</span>{" "}
                  {contest.contestType}
                </p>
                <p className="text-gray-800 dark:text-gray-400 text-lg mb-4">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(contest.contestDeadline).toLocaleDateString()}
                </p>
                <p className="text-gray-800 dark:text-gray-400 text-lg mb-4">
                  <span className="font-semibold">
                    Submission Instructions:
                  </span>{" "}
                  {contest.taskSubmissionInstructions}
                </p>
              </div>
            </div>

            {/* Average Ratings */}
            <div className="text-gray-800 dark:text-gray-400 text-lg mb-6 border-t pt-4">
              <span className="font-semibold">Contest Ratings:</span>{" "}
              {averageRating.toFixed(2)}
            </div>

            {/* Creator Details */}
            <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-lg mb-6 dark:border">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
                Created By
              </h2>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                <span className="font-semibold">Name:</span>{" "}
                {contest.creator.name}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                <span className="font-semibold">Email:</span>{" "}
                {contest.creator.email}
              </p>
            </div>

            {/* Rating System */}
            <div className="my-6 bg-gray-50 dark:bg-slate-800 dark:border p-6 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">
                Rate This Contest
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                (Only users who participated in the contest can rate. Admins and
                creators cannot rate this contest.)
              </p>
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        disabled={userInfo?.role !== "user" || isDeadlineOver}
                        name="rating"
                        value={currentRating}
                        onChange={() => setRating(currentRating)}
                        className="hidden"
                      />
                      <span
                        className={`cursor-pointer text-3xl ${
                          currentRating <= (hover || rating)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      >
                        &#9733;
                      </span>
                    </label>
                  );
                })}
              </div>
              <button
                onClick={handleRatingSubmit}
                disabled={userInfo?.role !== "user"}
                className={`mt-4 px-4 py-2 rounded font-bold transition ${
                  userInfo?.role !== "user"
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-400 hover:bg-green-500 text-gray-800"
                }`}
              >
                Submit Rating
              </button>
            </div>

            {/* Register or Deadline Passed */}
            <div className="flex justify-center mt-8">
              {isDeadlineOver ? (
                <p className="text-red-500 font-semibold text-lg">
                  The deadline has passed. You can no longer register.
                </p>
              ) : (
                <Link
                  state={{ price: contest.contestPrice, contest: contest }}
                  to="/dashboard/payment"
                >
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Pay to Register
                  </button>
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
