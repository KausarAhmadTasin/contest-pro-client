import { Helmet } from "react-helmet";
import Banner from "../../layouts/Banner/Banner";
import TopContests from "../../components/TopContests/TopContests";
import WinnersSection from "../../components/WinnersSection/WinnersSection";
import WeOffer from "../../components/WeOffer/WeOffer";

const Home = () => {
  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Home - ContestPro</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Banner />
      <TopContests />
      <WinnersSection />
      <WeOffer />
    </div>
  );
};

export default Home;
