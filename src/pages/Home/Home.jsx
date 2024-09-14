import { Helmet } from "react-helmet";
import Banner from "../../layouts/Banner/Banner";
import TopContests from "../../components/TopContests/TopContests";

const Home = () => {
  return (
    <div className="pt-20 py-96 min-h-screen">
      <Helmet>
        <title>Home - ContestPro</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Banner />
      <TopContests />
    </div>
  );
};

export default Home;
