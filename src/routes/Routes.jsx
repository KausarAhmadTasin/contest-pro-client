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
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/addContest",
        element: <AddContest />,
      },
      {
        path: "/dashboard/myCreatedContests",
        element: <MyCreatedContets />,
      },
      {
        path: "/dashboard/submittedContests",
        element: <SubmittedContests />,
      },
    ],
  },
]);

export default router;
