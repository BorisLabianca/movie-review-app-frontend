import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Submit from "./Submit";
import { useEffect, useState } from "react";

const createArray = (count) => {
  return new Array(count).fill("");
};

const ratings = createArray(10);

const RatingForm = ({ busy, initialState, onsubmit }) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = createArray(index + 1);
    setSelectedRatings([...ratings]);
  };

  const handleOnChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = { rating: selectedRatings.length, content };
    onsubmit(data);
  };

  useEffect(() => {
    if (initialState) {
      setContent(initialState.content);
      setSelectedRatings(createArray(initialState.rating));
    }
  }, [initialState]);

  return (
    <div>
      <div className="p-5 bg-white dark:bg-primary rounded space-y-3">
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="flex absolute top-1/2 -translate-y-1/2 items-center">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>
        <textarea
          className="h-24 w-full border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"
          value={content}
          onChange={handleOnChange}
        ></textarea>
        <Submit busy={busy} value="Rates This Movie" onClick={handleSubmit} />
      </div>
    </div>
  );
};

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiOutlineStar
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={24}
      />
    );
  });
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiFillStar
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={24}
      />
    );
  });
};

export default RatingForm;
