import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GiStairsGoal } from "react-icons/gi";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full gap-x-5 pt-16 min-h-screen bg-[#f5f5f5] text-[#333333)]">
        <div className="w-1/5 min-h-full bg-[#6380a3] text-white">
          <ul className="menu text-base">
            <li className="mt-2">
              <NavLink to="/dashboard/addContest">
                <IoIosAddCircleOutline className="text-lg" />
                Add Contest
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/dashboard/myCreatedContests">
                <GiStairsGoal className="text-lg" />
                My Created Contests
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/dashboard/submittedContests">
                <GiStairsGoal className="text-lg" />
                Submitted Contests
              </NavLink>
            </li>
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
