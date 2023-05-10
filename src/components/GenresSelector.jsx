import { ImTree } from "react-icons/im";

const GenresSelector = ({ onClick, badge }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-gray-400 bg-gray-600 absolute top-0 right-0 translate-x-3 -translate-y-3 text-xs w-5 h-5 rounded-full flex justify-center items-center text-white">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <button
      className="relative flex items-center space-x-2 py-1 px-3 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition dark:text-dark-subtle text-light-subtle hover:text-primary dark:hover:text-white rounded"
      type="button"
      onClick={onClick}
    >
      <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
    </button>
  );
};

export default GenresSelector;
