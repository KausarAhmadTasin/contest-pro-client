const WeOffer = () => {
  const offers = [
    {
      id: 1,
      title: "Diverse Contests",
      description:
        "Explore a variety of contests in programming, writing, designing, and more.",
      icon: "🎯",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Exciting Rewards",
      description:
        "Win amazing prizes, recognition, and opportunities to grow your skills.",
      icon: "🏆",
      gradient: "from-green-400 to-blue-500",
    },
    {
      id: 3,
      title: "Community Engagement",
      description:
        "Connect with like-minded individuals and grow your professional network.",
      icon: "🤝",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      id: 4,
      title: "Learning Opportunities",
      description:
        "Enhance your knowledge and expertise through participation and feedback.",
      icon: "📘",
      gradient: "from-cyan-500 to-teal-400",
    },
    {
      id: 5,
      title: "Stripe Payment System",
      description:
        "Seamlessly process payments with Stripe for secure and hassle-free transactions.",
      icon: "💳",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: 6,
      title: "Admin Dashboard",
      description:
        "Manage contests, track participants, and oversee operations with ease.",
      icon: "📊",
      gradient: "from-red-500 to-orange-500",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#11251b] via-[#33162f] to-[#0e2519] text-white">
      <div className="container mx-auto">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <h2 className="text-4xl text-center mb-6">What Do We Offer?</h2>
          <p className="text-center text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            At ContestPro, we provide a platform to showcase your talents, win
            exciting prizes, and connect with a thriving community of creators
            and innovators.
          </p>
          <div className="grid grid-cols-1 font-sans text-black md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-5xl mb-4 text-blue-500 dark:text-indigo-400">
                  {offer.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  {offer.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeOffer;
