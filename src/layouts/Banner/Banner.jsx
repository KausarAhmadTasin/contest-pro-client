import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      // Navigate to a route where search results are displayed with the query
      navigate(`/allContests?contestType=${searchTerm}`);
    }
  };

  return (
    <section
      className="relative md:container md:mx-auto mx-2 rounded-xl bg-cover bg-center bg-no-repeat h-[60vh] md:h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/pKPdgLD/ariel-Hk-N64-BISu-QA-unsplash.jpg")',
      }}
    >
      <div className="absolute rounded-xl inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center text-white p-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to ContestPro
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Find and participate in the best contests across various categories!
        </p>

        {/* Search Bar */}
        <div className="flex justify-center pt-5 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contests by type..."
            className="w-full max-w-lg px-4 py-2 rounded-s-md focus:outline-none bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-200 focus:ring"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-e-md"
          >
            Search
          </button>
        </div>

        {/* Links */}
        <nav className="mt-6">
          <ul className="flex justify-center gap-4">
            <li
              className={`hover:bg-[#183753] rounded-md py-1 px-2 ${
                location.pathname === "/" ? "underline decoration-white" : ""
              }`}
            >
              <Link to="/">Home</Link>
            </li>
            <li className="hover:bg-[#183753] rounded-md py-1 px-2">
              <Link to="/allContests">All Contests</Link>
            </li>
            <li className="hover:bg-[#183753] rounded-md py-1 px-2">
              <Link to="/signUp">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Banner;
