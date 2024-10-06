import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import "./ContestDetail.css";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

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

  const handleRatingSubmit = async () => {
    try {
      if (rating && email) {
        const res = await axiosSecure.patch("/contests/rating", {
          rating: rating,
          id: id,
          participant_email: email,
        });
        if (res.data.modifiedCount) {
          toast.success("Rating given");
        }
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(error.response.data.message);
    }
  };

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
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

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
            {/* Contest details */}
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
                  <span className="font-bold">Contest Price: </span>${" "}
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
              <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                <span className="font-bold">Contest Ratings: </span>{" "}
                {averageRating}
              </p>
            </div>

            {/* Creator details */}
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

            {/* Rating System */}
            <div className="my-6 dark:bg-gray-800 bg-[#F3F4F6] p-5 rounded-xl">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Rate This Contest
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                (Only users who participated in the contest can rate.
                &quot;Admin&quot; and &quot;creators&quot; cannot rate this
                contest.)
              </p>

              <div className="">
                <div>
                  {" "}
                  {[0, 1, 2, 3, 4].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          disabled={userInfo?.role !== "user"}
                          name="rating"
                          value={currentRating}
                          onChange={() => setRating(currentRating)}
                        />
                        <span
                          className={`star`}
                          style={{
                            color:
                              currentRating <= (hover || rating)
                                ? userInfo.role === "user"
                                  ? "#ffc107"
                                  : "#9EA2AA"
                                : "#9EA2AA",
                          }}
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
                  className={`mt-4 px-4 py-2 rounded text-gray-800  font-bold ${
                    userInfo?.role !== "user"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#c5f35b] hover:bg-[#c2f155]"
                  }`}
                >
                  Submit Rating
                </button>
              </div>
            </div>

            {/* Register or Deadline Passed */}
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
