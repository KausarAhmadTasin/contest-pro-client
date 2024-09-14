import { IoMdCloseCircleOutline } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  console.log(typeof localStorage.getItem("access-token"));

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}?role=${newRole}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Role changed");
        refetch();
      }
    } catch {
      toast.error("Failed to change role!");
    }
  };

  const handleDeleteUser = (userId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/users/${userId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            refetch();
          }
        }
      });
    } catch {
      toast.error("Could not delete!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Users - ContestPro</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 pt-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
          Manage Users
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  User
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-3 px-6 bg-gray-300 dark:bg-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <select
                      className="bg-gray-200 dark:bg-gray-700 border-none outline-none text-gray-800 dark:text-gray-300 p-2 rounded-md"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="creator">Creator</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn mt-2 border-none hover:bg-red-400 bg-red-500 text-white"
                    >
                      Delete <IoMdCloseCircleOutline className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
