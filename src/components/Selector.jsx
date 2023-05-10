const Selector = ({ name, value, label, onChange, options }) => {
  return (
    <select
      className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary p-1 outline-none transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary pr-10"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
};

export default Selector;
