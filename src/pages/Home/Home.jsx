import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="pt-3 py-96 min-h-screen">
      <Helmet>
        <title>Home - ContestPro</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <p>This is home</p>
    </div>
  );
};

export default Home;
