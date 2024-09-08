import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { useState, useEffect, useContext } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const ContestDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

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

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading contest details.</div>;
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const submissionData = {
      constest_id: contest._id,
      creator_email: contest.creator.email,
      contest_title: contest.contestName,
      contest_prize: contest.prizeMoney,
      participant_name: form.participant_name.value,
      participant_email: form.participant_email.value,
      task_link: form.task_link.value,
    };

    try {
      const res = await axiosSecure.post("/participants", submissionData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task submitted!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsOpen(false);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Could not submit",
        customClass: {
          confirmButton: "bg-[#F97316]",
        },
      });
    }
  };

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
                <strong>Description: </strong>
                {contest.contestDescription}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                <strong>Prize Money: </strong>
                {contest.prizeMoney}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                <strong>Contest Price: </strong>${contest.contestPrice}
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                <strong>Type: </strong>
                {contest.contestType}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                <strong>Deadline: </strong>
                {new Date(contest.contestDeadline).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
                <strong>Submission Instructions: </strong>
                {contest.taskSubmissionInstructions}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Created By
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-lg">
              <strong>Name: </strong>
              {contest.creator.name}
            </p>
            <p className="text-gray-700 dark:text-gray-400 text-lg">
              <strong>Email: </strong>
              {contest.creator.email}
            </p>
          </div>
          <div className="flex w-full justify-center mt-5">
            <div onClick={() => setIsOpen(true)}>
              <PrimaryBtn>Upload Submission</PrimaryBtn>
            </div>
          </div>

          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 relative">
                <button
                  className="absolute right-2 top-2 text-2xl hover:scale-110 text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoMdCloseCircleOutline />
                </button>
                <h3 className="font-bold text-lg">Submit Your Entry</h3>
                <p className="py-4">
                  Follow the instructions to submit your entry.
                </p>
                <form onSubmit={handleTaskSubmit}>
                  <input
                    type="text"
                    placeholder="Participant Name"
                    className="input input-bordered w-full"
                    required
                    name="participant_name"
                    value={user?.displayName}
                    readOnly
                  />
                  <p className="pt-1 text-sm text-gray-500 dark:text-gray-200">
                    You cannot change user name
                  </p>
                  <input
                    type="text"
                    placeholder="Participant Email"
                    className="input input-bordered w-full mt-4"
                    value={user?.email}
                    name="participant_email"
                    required
                    readOnly
                  />
                  <p className="pt-1 text-sm text-gray-500 dark:text-gray-200">
                    You cannot change user email
                  </p>

                  <input
                    type="url"
                    name="task_link"
                    placeholder="Enter submission link"
                    className="input input-bordered w-full mt-4"
                    required
                  />
                  <p className="pt-1 text-sm text-gray-500 dark:text-gray-200 mb-4">
                    Give the drive link of your task
                  </p>
                  <input
                    type="submit"
                    className="btn active:scale-95 btn-primary w-full"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContestDetail;
