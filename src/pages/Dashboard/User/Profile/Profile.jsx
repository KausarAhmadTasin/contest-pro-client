import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [winningPercentage, setWinningPercentage] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = [] } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:5000/users?profile=abc@c.com`
      );
      return res.data;
    },
  });

  useEffect(() => {
    const fetchContestStats = async () => {
      try {
        const totalContestsRes = await axiosSecure.get(
          `/participants?participant=${user.email}`
        );
        const totalContests = totalContestsRes.data.length;

        const winningContestsRes = await axiosSecure.get(
          `/participants?participant=${user.email}&winner=true`
        );
        const wins = winningContestsRes.data.length;

        const percentage = totalContests > 0 ? (wins / totalContests) * 100 : 0;

        setWinningPercentage(percentage.toFixed(2));
      } catch (error) {
        console.error("Error fetching contest data", error);
      }
    };

    fetchContestStats();
  }, [user.email, axiosSecure]);

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-center mt-1 mb-4 text-gray-600 dark:text-gray-200">
        Profile
      </h1>
      <div className="w-3/4 flex md:flex-row flex-col justify-between items-center mx-auto bg-gray-200 dark:bg-gray-700 p-10 px-20 rounded-2xl">
        <div className="flex flex-col items-center">
          <img className="h-28 w-28 rounded-full" src={user?.photoURL} alt="" />
          <h1 className="font-semibold text-xl mt-5">
            <span className="font-normal">Name: </span>
            {userInfo.name}
          </h1>
        </div>
        {/* Winning Stats */}
        <div>
          {winningPercentage !== null ? (
            <>
              {" "}
              <CircularProgressbar
                className="h-24 mt-4"
                value={winningPercentage}
                text={`${winningPercentage}%`}
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
          <h2 className="text-xl text-center mt-8 mb-6">
            Your Winning Percentage
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
