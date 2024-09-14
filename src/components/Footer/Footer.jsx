import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#002b5c] text-white py-8">
      <div className="md:container md:mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-28">
          {/* About section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About ContestPro</h3>
            <p className="text-sm">
              ContestPro is your go-to platform for discovering and
              participating in exciting contests across various categories. Join
              now to showcase your talent and win amazing prizes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allContests" className="hover:underline">
                  All Contests
                </Link>
              </li>
              <li>
                <Link to="/aboutUs" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 border-t border-gray-700 pt-4">
          <p className="text-sm">
            &copy; 2024 ContestPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
