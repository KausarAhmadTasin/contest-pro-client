import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import auth from "../firebase/config.firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const createUser = (email, password, name, photo, form) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        return updateProfile(currentUser, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          toast.success("Successfully registered!");
          form.reset();
        });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setUser(null);
    });
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider)
      .then((result) => {
        setUser(result.user);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);

      setLoading(false);

      if (currentUser) {
        axios
          .post(`https://dream-jobs-server-nine.vercel.app/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      } else {
        axios.post(
          `https://dream-jobs-server-nine.vercel.app/logout`,
          loggedUser,
          {
            withCredentials: true,
          }
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  const authInfo = {
    user,
    createUser,
    signIn,
    logOut,
    loading,
    googleLogin,
    githubLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
