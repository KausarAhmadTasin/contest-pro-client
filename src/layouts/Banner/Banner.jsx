import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative py-16 md:py-0">
      {/* Blurry Background Layers */}
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-800 opacity-25 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gray-900 opacity-40 backdrop-blur-3xl"></div>

      {/* Static Content */}
      <div className="container mx-auto relative flex flex-col items-center bg-transparent text-gray-800 justify-center h-full text-center px-8 md:px-12 md:py-16">
        {/* Title Section */}
        <h1 className="text-4xl text-gray-200 md:text-5xl tracking-wide mb-3">
          Welcome to{" "}
          <span className="text-gradient bg-gradient-to-r from-blue-300 to-lime-400 bg-clip-text text-transparent">
            ContestPro
          </span>
        </h1>
        <p className="text-lg md:text-lg font-mono font-thin text-gray-100 max-w-3xl my-4">
          Your ultimate hub for finding, hosting, and winning contests! Whether
          you&apos;re a creator, participant, or enthusiast, ContestPro is your
          gateway to success.
        </p>
        <p className="text-sm md:text-base dark:text-pink-500 text-indigo-300 font-bold italic mt-2">
          &quot;Unleash your potential and take your ambitions to the next
          level.&quot;
        </p>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-8">
          <Link
            to="/signUp"
            className="bg-gradient-to-r from-blue-900 to-indigo-800 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/aboutUs"
            className="py-2 px-6 rounded-full border-2 border-indigo-800 text-accent shadow-md hover:bg-indigo-800 hover:text-white hover:scale-105 transition-transform duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Added Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full px-4">
          <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-transform transform hover:scale-105">
            <div className="w-16 h-16 flex items-center justify-center text-white text-xl rounded-full bg-blue-500 shadow-lg mb-4">
              🏆
            </div>
            <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-200 mb-2">
              Win Rewards
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Participate and win exciting prizes in contests tailored to your
              skills.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-transform transform hover:scale-105">
            <div className="w-16 h-16 flex items-center justify-center text-white text-xl rounded-full bg-green-500 shadow-lg mb-4">
              🌟
            </div>
            <h3 className="font-semibold text-lg text-green-700 dark:text-green-200 mb-2">
              Showcase Talent
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use our platform to highlight your abilities and gain recognition.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-transform transform hover:scale-105">
            <div className="w-16 h-16 flex items-center justify-center text-white text-xl rounded-full bg-indigo-500 shadow-lg mb-4">
              🤝
            </div>
            <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-200 mb-2">
              Connect Globally
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Engage with a global community of creators, participants, and
              enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
