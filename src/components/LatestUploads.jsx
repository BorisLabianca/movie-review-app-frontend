import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

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

const MovieListItem = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img src={poster} alt={title} className="w-full aspect-video" />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className="font-semibold text-lg text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((genre, index) => {
                  if (genres.length - 1 !== index) {
                    return (
                      <span
                        key={genre + index}
                        className="font-semibold text-primary dark:text-white text-xs"
                      >
                        {genre + ", "}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={genre + index}
                        className="font-semibold text-primary dark:text-white text-xs"
                      >
                        {genre}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
