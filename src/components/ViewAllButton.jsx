const ViewAllButton = ({ visible, children, onClick }) => {
  if (!visible) return null;
  return (
    <button
      className="dark:text-white text-primary hover:underline transition"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default ViewAllButton;
