import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";

const AppSearchForm = ({
  placeholder,
  onSubmit,
  showResetIcon,
  onReset,
  inputClassName = defaultInputStyle,
}) => {
  const [value, setValue] = useState("");
  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        className={
          "border-2 transition bg-transparent rounded p-1 outline-none " +
          inputClassName
        }
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
        }}
      />
      {showResetIcon ? (
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
          onClick={handleReset}
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
};

export default AppSearchForm;
