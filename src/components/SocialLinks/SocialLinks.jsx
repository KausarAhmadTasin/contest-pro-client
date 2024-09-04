import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const SocialLinks = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const hangleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Signed in!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Signing in failed!");
      });
  };

  return (
    <div className="text-center">
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
        Continue with
      </p>
      <div className="flex justify-center gap-x-3 text-2xl mt-2">
        <FcGoogle
          onClick={hangleGoogleLogin}
          className=" hover:-translate-y-1 cursor-pointer duration-200 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default SocialLinks;
