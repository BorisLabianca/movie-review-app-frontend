import { ImSpinner3 } from "react-icons/im";

const Submit = ({ value, busy, type, onClick }) => {
  return (
    <button
      type={type || "submit"}
      className="w-full rounded dark:bg-white bg-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg dark:text-secondary cursor-pointer h-10 flex items-center justify-center"
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </button>
  );
};

export default Submit;
