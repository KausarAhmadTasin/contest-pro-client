import { Helmet } from "react-helmet";
import { IoIosArrowRoundForward } from "react-icons/io";

const SubmittedContests = () => {
  // Example data for contests (replace with actual data)
  const contests = [
    { contestName: "Photography Contest", prize: "$500" },
    { contestName: "Art Contest", prize: "$300" },
    { contestName: "Writing Contest", prize: "$200" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Helmet>
        <title>My Contests - ContestPro</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        My Contests
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Contest Name
              </th>
              <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Prize
              </th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-between">
                    <p className="hover:underline underline-offset-3">
                      {" "}
                      {contest.contestName}{" "}
                    </p>{" "}
                    <p className="flex hover:-translate-y-1 text-sky-500 duration-200 items-center justify-between">
                      View Submission Details <IoIosArrowRoundForward />
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                  {contest.prize}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedContests;
