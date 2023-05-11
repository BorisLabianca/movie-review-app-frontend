import { commonInputClasses } from "../../utils/theme";

const ActorForm = ({ title, btnTitle }) => {
  return (
    <div className="dark:bg-primary bg-white p-3 w-[35rem] rounded">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary opacity-80 transition rounded"
          type="submit"
        >
          {btnTitle}
        </button>
      </div>
      <form className="flex space-x-2">
        <img
          src="https://images.unsplash.com/photo-1522878129833-838a904a0e9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
          alt=""
          className="w-36 h-36 aspect-square object-cover rounded"
        />
        <div className="flex-grow flex-col">
          <input
            placeholder="Enter the name"
            type="text"
            className={commonInputClasses + " border-b-2"}
          />
          <textarea
            placeholder="About..."
            className={commonInputClasses + " border-b-2 resize-none h-full"}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default ActorForm;
