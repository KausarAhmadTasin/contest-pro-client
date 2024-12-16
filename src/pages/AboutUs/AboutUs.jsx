import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ContestPro</title>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-700 to-slate-400 py-10 pt-28 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-white">
          About Us
        </h1>
        <p className="text-lg text-gray-900 mt-4">
          Learn more about ContestPro and the vision behind it.
        </p>
      </section>

      {/* Main Content */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12 transition hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Welcome to ContestPro!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              ContestPro is your one-stop platform for discovering and
              participating in a wide variety of online contests. Whether
              you&apos;re a writer, reviewer, or a creative individual, we have
              contests that fit all talents and interests. Our mission is to
              connect talented individuals with the best opportunities to
              showcase their skills and win amazing prizes.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12 transition hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our goal is to create a vibrant community of contest enthusiasts
              and to provide a fair and enjoyable platform for everyone. We
              believe in celebrating creativity and innovation through diverse
              contests across categories such as Book Review, Movie Review,
              Article Writing, and much more. We strive to offer a seamless
              experience where participants can easily find and engage in the
              contests that excite them.
            </p>
          </div>

          {/* Meet the Team */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              Meet the Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              ContestPro is brought to you by a passionate team of individuals
              who are dedicated to creating a platform that supports creativity
              and competition. Our team brings together expertise in technology,
              design, and contest management to ensure you have the best
              experience.
            </p>

            {/* Team Member Card */}
            <div className="flex justify-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md p-6 w-full max-w-xs hover:shadow-2xl transition duration-300">
                <img
                  src="https://i.ibb.co/cFWhLbk/h-img.jpg"
                  alt="Kausar Ahmad"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-600"
                />
                <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200">
                  Kausar Ahmad
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300 mt-1">
                  Founder & Lead Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
