import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {
  return (
    <div className="flex flex-col font-sans h-full bg-white dark:bg-gray-800 shadow-gl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <img
        src={contest.image || "https://via.placeholder.com/400x200"}
        alt={contest.contestName}
        className="w-full h-48 object-cover"
      />

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
          {contest.contestName || "Marketing Strategy Challenge"}
        </h2>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center flex-1">
          {contest.contestDescription ||
            "Submit your best marketing strategy to promote eco-friendly products."}
        </p>

        {/* Contest Details Table */}
        <div className="overflow-auto">
          <table className="w-full table-auto text-sm text-gray-800 dark:text-gray-300">
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="px-2 py-2">💰</td>
                <td className="px-2 py-2 font-semibold">Prize:</td>
                <td className="px-2 py-2">
                  {contest.prizeMoney || "1000 USD"}
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-2 py-2">🏷</td>
                <td className="px-2 py-2 font-semibold">Price:</td>
                <td className="px-2 py-2">
                  {contest.contestPrice || "20 USD"}
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-2 py-2">📅</td>
                <td className="px-2 py-2 font-semibold">Deadline:</td>
                <td className="px-2 py-2">
                  {new Date(
                    contest.contestDeadline || "2024-11-20"
                  ).toLocaleDateString()}
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-2 py-2">📝</td>
                <td className="px-2 py-2 font-semibold">Submission:</td>
                <td className="px-2 py-2">
                  {contest.taskSubmissionInstructions ||
                    "Upload to your drive and submit the link."}
                </td>
              </tr>
              <tr>
                <td className="px-2 py-2">🔖</td>
                <td className="px-2 py-2 font-semibold">Type:</td>
                <td className="px-2 py-2">
                  {contest.contestType || "Marketing Strategy"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-auto">
          <Link to={`/contestDetails/${contest._id}`}>
            <button className="bg-gradient-to-r from-blue-900 to-indigo-800 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
