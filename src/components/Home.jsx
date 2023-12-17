import Container from "./Container";
import HeroSlideShow from "./user/HeroSlideShow";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import TopRatedTVSeries from "./user/TopRatedTVSeries";
import TopRatedWebSeries from "./user/TopRatedWebSeries";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-[100vh]">
      <Container className=" px-2 xl:p-0">
        <NotVerified />
        <HeroSlideShow />
        <TopRatedMovies />
        <TopRatedWebSeries />
        <TopRatedTVSeries />
      </Container>
    </div>
  );
};

export default Home;
