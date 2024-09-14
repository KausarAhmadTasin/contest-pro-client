import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const tags = [
  "Image Design Contests",
  "Article Writing",
  "Marketing Strategy",
  "Digital Advertisement Contests",
  "Gaming Review",
  "Book Review",
  "Business Idea Contests",
  "Movie Review",
];

const image_bb_key = import.meta.env.VITE_IMAGE_BB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_bb_key}`;

const AddContestForm = () => {
  const [selectedTag, setSelectedTag] = useState(tags[0]);

  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // image upload to imgbb and then get an url
    const imageFile = { image: form.image.files[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const contest = {
        contestName: form.contestDeadline.value,
        image: res.data.data.display_url,
        contestDescription: form.contestDeadline.value,
        contestPrice: form.contestDeadline.value,
        prizeMoney: form.contestDeadline.value,
        taskSubmissionInstructions: form.contestDeadline.value,
        contestType: form.contestDeadline.value,
        contestDeadline: form.contestDeadline.value,
        isPending: false,
        participants_count: 0,
        winner: false,
        creator: {
          name: user?.displayName,
          email: user?.email,
        },
      };

      try {
        await axiosSecure.post("/contests", contest);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Contest added!",
          showConfirmButton: false,
          timer: 1500,
        });

        form.reset();
      } catch (error) {
        console.error("Error adding contest:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Could not add contest",
          customClass: {
            confirmButton: "bg-[#F97316]",
          },
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Contests - ContestPro</title>
      </Helmet>
      <div className="md:container mx-1 md:mx-auto py-5 w-full">
        <form
          onSubmit={handleSubmit}
          className="md:max-w-2xl md:mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-500 dark:text-gray-200">
            Add Contest
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Contest Name
            </label>
            <input
              type="text"
              name="contestName"
              required
              className="w-full px-4 py-2 border text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              name="image"
              required
              className="w-full px-4 py-2 border text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Contest Description
            </label>
            <textarea
              name="contestDescription"
              required
              className="w-full px-4 py-2 border text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Contest Price
            </label>
            <input
              type="number"
              name="contestPrice"
              required
              className="w-full px-4 py-2 border text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Prize Money/Others
            </label>
            <input
              type="text"
              name="prizeMoney"
              required
              className="w-full px-4 py-2 border text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Task Submission Instructions
            </label>
            <textarea
              name="taskSubmissionInstructions"
              required
              className="w-full px-4 py-2 border text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Contest Type/Tags
            </label>
            <select
              name="contestType"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-4 py-2 border text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800"
            >
              {tags.map((tag, idx) => (
                <option key={idx} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 dark:text-gray-200 font-medium mb-2">
              Contest Deadline
            </label>
            <input
              type="date"
              name="contestDeadline"
              required
              className="w-full px-4 py-2 border bg-gray-400 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-md focus:ring"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 active:scale-95 bg-[#d48d5a] font-semibold text-white rounded-md hover:bg-[#df9763]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddContestForm;
