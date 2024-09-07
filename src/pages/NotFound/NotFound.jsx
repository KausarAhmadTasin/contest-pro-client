import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex  items-center px-4 py-2 bg-amber-500 text-white text-lg font-medium rounded-md hover:bg-amber-400"
        >
          <FaHome className="mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
