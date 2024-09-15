import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://contest-pro-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
