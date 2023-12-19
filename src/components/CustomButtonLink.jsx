const CustomButtonLink = ({ label, clickable = true, onClick }) => {
  const className = clickable
    ? "text-highlight dark:text-highlight-dark hover:underline"
    : "text-highlight dark:text-highlight-dark cursor-default";
  return (
    <button className={className} type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButtonLink;
