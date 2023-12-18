import { AiFillStar } from "react-icons/ai";

const RatingStar = ({ rating }) => {
  if (!rating)
    return (
      <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark">
        No Ratings
      </p>
    );

  return (
    <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark">
      <span>{rating}</span>
      <AiFillStar />
    </p>
  );
};

export default RatingStar;
