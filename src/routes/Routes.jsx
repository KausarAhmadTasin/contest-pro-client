import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Home/SignUp/SignUp";
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
    ],
  },
]);

export default router;
