import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import MovieListItem from "./MovieListItem";

const LatestUploads = () => {
  return (
    <div className="bg-white shadow-md shadow-300y-500 dark:shadow-gray-700 dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>
      <MovieListItem
        movie={{
          poster:
            "https://images.unsplash.com/photo-1680817976135-91487402512f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
          title: "Lorem ipsum dolor sit amet.",
          status: "Public",
          genres: ["Action", "Comedy", "Adventure"],
        }}
      />
    </div>
  );
};

export default LatestUploads;
