import { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../LiveSearch";
import TagsInput from "../TagsInput";
import Submit from "../form/Submit";

export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit log: ", movieInfo);
  };

  const renderItem = (result) => {
    return (
      <div className="flex space-x-2 rounded overflow-hidden" key={result.id}>
        <img
          src={result.avatar}
          alt={result.name}
          className="w-16 h-16 object-cover"
        />
        <p className="dark:text-white font-semibold">{result.name}</p>
      </div>
    );
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const { title, storyLine, director } = movieInfo;

  return (
    <form className="flex space-x-3" onSubmit={handleSubmit}>
      <div className="w-[70%] h-5 space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            value={title}
            onChange={handleChange}
            name="title"
            id="title"
            placeholder="X-Men"
            className={commonInputClasses + " border-b-2 font-semibold text-xl"}
          />
        </div>
        <div>
          <Label htmlFor="storyLine">Storyline</Label>
          <textarea
            id="storyLine"
            placeholder="Movie storyline..."
            className={commonInputClasses + " resize-none h-24 border-b-2"}
            value={storyLine}
            onChange={handleChange}
            name="storyLine"
          ></textarea>
        </div>
        <div>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput name="tags" onChange={updateTags} />
        </div>
        <LiveSearch
          placeholder="Search profile"
          results={results}
          renderItem={renderItem}
          onSelect={(result) => console.log(result)}
        />
        <Submit value="Upload" />
      </div>
      <div className="w-[30%] h-5 bg-green-400"></div>
    </form>
  );
};

export default MovieForm;

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold"
    >
      {children}
    </label>
  );
};
