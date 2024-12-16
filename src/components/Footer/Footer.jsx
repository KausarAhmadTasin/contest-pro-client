import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="relative bg-gray-800 shadow-lg overflow-hidden pt-10">
      {/* Blurry Background Layers */}
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-green-600 to-indigo-800 opacity-25 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gray-900 opacity-50 backdrop-blur-3xl"></div>

      {/* Content */}
      <div className="md:container flex flex-col justify-between relative md:mx-auto md:px-10 px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-16 gap-10 mb-10">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              About ContestPro
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              ContestPro is your go-to platform for discovering and
              participating in exciting contests across various categories. Join
              now to showcase your talent and win amazing prizes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allContests"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  All Contests
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Follow Us
            </h3>
            <div className="flex space-x-10">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-blue-500 transition duration-300"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-blue-400 transition duration-300"
              >
                <BsTwitterX size={26} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-pink-500 transition duration-300"
              >
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-gray-300 dark:border-gray-700 pt-4">
          <p className="text-gray-400 dark:text-gray-400 text-sm">
            &copy; 2024 ContestPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
