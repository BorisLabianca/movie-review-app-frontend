const ForInput = ({ name, placeholder, label, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        type="text"
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-dark-subtle w-full text-lg outline-none focus:border-white p-1 text-white peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="text-dark-subtle font-semibold peer-focus:text-white transition self-start"
      >
        {label}
      </label>
    </div>
  );
};

export default ForInput;
