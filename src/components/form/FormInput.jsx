const FormInput = ({ name, placeholder, label, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        type="text"
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary w-full text-lg outline-none p-1 dark:text-white dark:bg-transparent peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="dark:text-dark-subtle text-light-subtle font-semibold dark:peer-focus:text-white peer-focus:text-primary transition self-start"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
