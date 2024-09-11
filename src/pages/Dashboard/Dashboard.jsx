import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GiStairsGoal } from "react-icons/gi";
import { VscFileSubmodule } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const { data: { role } = "user" } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axiosPublic(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const creatorLinks = (
    <>
      <li className="mt-2">
        <NavLink to="/dashboard" end>
          <GiStairsGoal className="text-lg" />
          My Created Contests
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/dashboard/addContest">
          <IoIosAddCircleOutline className="text-lg" />
          Add Contest
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/dashboard/submittedContests">
          <VscFileSubmodule className="text-lg" />
          Submitted Contests
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      {" "}
      <li className="mt-2">
        <NavLink to="/dashboard/manageUsers">
          <FaUsers className="text-lg" />
          Manage User
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/dashboard/manageContests">
          <MdManageAccounts className="text-lg" />
          Manage Contest
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li className="mt-2">
        <NavLink to="/dashboard/myParticipatedContests">
          <FaUsers className="text-lg" />
          My Participated Contest
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/dashboard/myWinningContests">
          <MdManageAccounts className="text-lg" />
          My Winning Contests
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/dashboard/profile">
          <MdManageAccounts className="text-lg" />
          Profile
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <Navbar />
      <div className="flex w-full gap-x-5 pt-16 min-h-screen bg-[#f5f5f5] dark:bg-[#2f2f30] text-[#333333)]">
        <div className="w-1/5 min-h-full bg-[#6380a3] text-white">
          <ul className="menu text-base">
            {role === "creator" && creatorLinks}
            {role === "admin" && (
              <>
                {creatorLinks}
                {adminLinks}
              </>
            )}
            {role === "user" && userLinks}
          </ul>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
