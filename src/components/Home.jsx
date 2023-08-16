import Container from "./Container";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-[100vh]">
      <Container>
        <NotVerified />
        <TopRatedMovies />
      </Container>
    </div>
  );
};

export default Home;
