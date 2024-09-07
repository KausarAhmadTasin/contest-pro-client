import { useState } from "react";
import { Helmet } from "react-helmet";

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

const AddContestForm = () => {
  const [selectedTag, setSelectedTag] = useState(tags[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <>
      <Helmet>
        <title>Add Contests - ContestPro</title>
      </Helmet>
      <div className="container mx-auto py-4 w-full">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add Contest
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Contest Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border bg-white rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border bg-white rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Contest Description
            </label>
            <textarea
              required
              className="w-full px-4 py-2 border bg-white rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Contest Price
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border bg-white rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Prize Money/Others
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border bg-white rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Task Submission Instructions
            </label>
            <textarea
              required
              className="w-full px-4 py-2 border bg-white rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Contest Type/Tags
            </label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-4 py-2 border bg-white rounded-md focus:ring focus:ring-indigo-200"
            >
              {tags.map((tag, idx) => (
                <option key={idx} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Contest Deadline
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border text-white bg-slate-400 rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddContestForm;
