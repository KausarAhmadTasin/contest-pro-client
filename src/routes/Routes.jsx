import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import AddContest from "../pages/Dashboard/ContestCreator/AddContest/AddContest";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import MyCreatedContets from "../pages/Dashboard/ContestCreator/MyCreatedContets/MyCreatedContets";
import SubmittedContests from "../pages/Dashboard/ContestCreator/SubmittedContests/SubmittedContests";
import AllContests from "../pages/AllContests/AllContests";
import PrivateRoutes from "./PrivateRoutes";
import ContestDetail from "../pages/CotestDetail/ContestDetail";
import SubmissionDetails from "../pages/Dashboard/ContestCreator/SubmissonDetails/SubmissionDetails";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests/ManageContests";
import MyParticipatedContests from "../pages/Dashboard/User/MyParticipatedContests/MyParticipatedContests";
import MyWinningContests from "../pages/Dashboard/User/MyWinnigContests/MyWinningContests";
import Profile from "../pages/Dashboard/User/Profile/Profile";
import Payment from "../pages/Dashboard/Payment/Payment";
import SignUp from "../pages/SignUp/SignUp";
import AboutUs from "../pages/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allContests",
        element: <AllContests />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/contestDetails/:id",
        element: (
          <PrivateRoutes>
            <ContestDetail />
          </PrivateRoutes>
        ),
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/addContest",
        element: <AddContest />,
      },
      {
        path: "/dashboard",
        element: <MyCreatedContets />,
      },
      {
        path: "/dashboard/submittedContests",
        element: <SubmittedContests />,
      },
      {
        path: "/dashboard/submissionDetails",
        element: <SubmissionDetails />,
      },
      {
        path: "/dashboard/manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/manageContests",
        element: <ManageContests />,
      },
      {
        path: "/dashboard/myParticipatedContests",
        element: <MyParticipatedContests />,
      },
      {
        path: "/dashboard/myWinningContests",
        element: <MyWinningContests />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
    ],
  },
]);

export default router;
