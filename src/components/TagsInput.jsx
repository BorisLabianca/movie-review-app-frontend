import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = () => {
  const inputRef = useRef();
  const tagsInputRef = useRef();
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");
      setTags([...tags, tag]);
      setTag("");
    }
    if (key === "Backspace" && tags.length && !tag) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };

  const handleOnFocus = () => {
    tagsInputRef.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInputRef.current.classList.add("dark:border-white", "border-primary");
  };

  const handleOnBlur = () => {
    tagsInputRef.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInputRef.current.classList.remove(
      "dark:border-white",
      "border-primary"
    );
  };

  useEffect(() => {
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [tag]);

  return (
    <div>
      <div
        ref={tagsInputRef}
        className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full flex items-center space-x-2 overflow-x-auto custom-scroll-bar transition mt-2"
        onKeyDown={handleKeyDown}
      >
        {tags.map((tag) => {
          return (
            <Tag onClick={() => removeTag(tag)} key={tag}>
              {tag}
            </Tag>
          );
        })}
        <input
          ref={inputRef}
          type="text"
          placeholder="Tag one, Tag two,"
          className="h-full flex-grow bg-transparent outline-none dark:text-white"
          value={tag}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
};

export default TagsInput;

const Tag = ({ children, onClick }) => {
  return (
    <span className="dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm px-1 whitespace-nowrap">
      {children}
      <button onClick={onClick} type="button">
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};
