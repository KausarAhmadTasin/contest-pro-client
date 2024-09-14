import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SignUp = () => {
  const [textPassword, setTextPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const axiosPublic = useAxiosPublic();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    setPasswordError("");

    const uppercaseRegex = /^(?=.*[A-Z])/;
    const lowercaseRegex = /^(?=.*[a-z])/;
    const lengthRegex = /^.{6,}$/;

    if (!uppercaseRegex.test(password)) {
      setPasswordError("Password must have at least one uppercase letter.");
      return;
    }

    if (!lowercaseRegex.test(password)) {
      setPasswordError("Password must have at least one lowercase letter.");
      return;
    }

    if (!lengthRegex.test(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password, name, photo, form)
      .then((result) => {
        const loggedUser = result.user;

        updateUserProfile(name, photo)
          .then(async () => {
            const userInfo = {
              email: loggedUser.email,
              name: loggedUser.displayName || name,
              role: "user",
            };

            await axiosPublic.post("/users", userInfo).then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Signed Up",
                showConfirmButton: false,
                timer: 1500,
              });
              form.reset();
              navigate("/");
            });
          })
          .catch((err) => {
            console.log("Error updating user profile:", err);
            toast.error("Sign up failed!");
          });
      })
      .catch((err) => {
        console.log("Error signing up user:", err);
        toast.error("Sign up failed!");
      });
  };

  return (
    <div>
      <Helmet>
        <title>Sign Up - Contest Pro</title>
      </Helmet>
      <div className="hero bg-[#F3F4F6] pt-10 dark:bg-[#27282c] min-h-screen">
        <div className="card shadow-lg bg-white dark:bg-[#303238] my-10 rounded-mdborder-gray-200 w-11/12 md:w-3/4 lg:w-1/3">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Abdul Karim"
                className="input bg-white text-gray-600 dark:text-gray-300 dark:bg-[#292a2e]  focus:outline-none focus:border-sky-400 border-slate-300"
                required
                autoFocus
                name="name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="a@b.com"
                className="input bg-white text-gray-600 dark:text-gray-300 dark:bg-[#292a2e]  focus:outline-none focus:border-sky-400 border-slate-300"
                required
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="photo.com"
                className="input bg-white text-gray-600 dark:text-gray-300 dark:bg-[#292a2e]  focus:outline-none focus:border-sky-400 border-slate-300"
                required
                name="photo"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={textPassword ? "" : "password"}
                  placeholder="Password"
                  className="input bg-white text-gray-600 dark:text-gray-300 dark:bg-[#292a2e]  focus:outline-none w-full focus:border-sky-400 border-slate-300"
                  required
                  name="password"
                />
                <div
                  onClick={() => setTextPassword(!textPassword)}
                  className="absolute top-1/3 right-2 text-gray-500"
                >
                  {textPassword ? <FiEye /> : <FiEyeOff />}
                </div>
                {passwordError && (
                  <p className="text-red-700 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <label className="label label-text-alt justify-start text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/signIn"
                  className="link link-hover decoration-blue-600 dark:decoration-blue-300"
                >
                  <span className="dark:text-sky-400  text-blue-600 ml-1">
                    Sign In
                  </span>
                </Link>
              </label>
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                value="Register"
                className="btn border-none bg-[#57d367] hover:bg-[#65e476] text-white text-lg"
              ></input>
            </div>
            <SocialLinks />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
