import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { data: isAdmin, isPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data?.role;
    },
    enabled: !!user?.email,
  });

  if (loading || isPending)
    return (
      <div className="flex justify-center">
        <span className="w-16 min-h-screen bg-blue-600 flex justify-center items-center loading loading-ring "></span>
      </div>
    );

  if (user && isAdmin === "admin") return children;

  return <Navigate state={location.pathname} to="/signIn" />;
};

AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoutes;
