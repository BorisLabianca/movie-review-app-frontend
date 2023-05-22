const PaginationButtons = ({
  className = "",
  onNextClick,
  onPreviousClick,
}) => {
  const getClasses = () => {
    return "flex justify-end items-center space-x-3 ";
  };

  return (
    <div className={getClasses() + className}>
      <Button title="Prev" onClick={onPreviousClick} />
      <Button title="Next" onClick={onNextClick} />
    </div>
  );
};

export default PaginationButtons;

const Button = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="text-primary dark:text-white hover:underline"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
