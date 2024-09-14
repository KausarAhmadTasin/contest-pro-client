import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ContestPro</title>
      </Helmet>
      <section className="bg-gray-100 dark:bg-gray-900 py-12 pt-20">
        <div className="md:container md:mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            About Us
          </h1>

          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              Welcome to ContestPro!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              ContestPro is your one-stop platform for discovering and
              participating in a wide variety of online contests. Whether
              you&apos;re a writer, reviewer, or a creative individual, we have
              contests that fit all talents and interests. Our mission is to
              connect talented individuals with the best opportunities to
              showcase their skills and win amazing prizes.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
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
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              Meet the Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ContestPro is brought to you by a passionate team of individuals
              who are dedicated to creating a platform that supports creativity
              and competition. Our team brings together expertise in technology,
              design, and contest management to ensure you have the best
              experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg">
                <img
                  src="https://i.ibb.co.com/cFWhLbk/h-img.jpg"
                  alt="Kausar Ahmad"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold text-center">Kausar Ahmad</h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
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
