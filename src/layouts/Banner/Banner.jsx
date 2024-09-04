import { useLocation } from "react-router-dom";

const Banner = () => {
  const location = useLocation();

  return (
    <section
      className="relative container mx-auto rounded-xl bg-cover bg-center bg-no-repeat h-[60vh] md:h-[80vh] flex items-center justify-center"
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
            placeholder="Search contests by tags..."
            className="w-full max-w-lg px-4 py-2 rounded-md focus:outline-none bg-white dark:bg-gray-400 text-gray-600 dark:text-gray-200 focus:ring focus:ring-white"
          />
          <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            Search
          </button>
        </div>

        {/* Conditional Underline on Home link */}
        <nav className="mt-6">
          <ul className="flex justify-center gap-4">
            <li
              className={`hover:bg-[#183753] rounded-md py-1 px-2 ${
                location.pathname === "/" ? "underline decoration-white" : ""
              }`}
            >
              <a href="/">Home</a>
            </li>
            <li className="hover:bg-[#183753] rounded-md py-1 px-2">
              <a href="/all-contests">All Contests</a>
            </li>
            <li className="hover:bg-[#183753] rounded-md py-1 px-2">
              <a href="/signIn">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Banner;
