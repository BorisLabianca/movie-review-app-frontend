import TagsInput from "../TagsInput";

const commonInputClasses =
  "w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary";

const MovieForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="flex space-x-3" onSubmit={handleSubmit}>
      <div className="w-[70%] h-5 space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
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
          ></textarea>
        </div>
        <div>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput />
        </div>
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
