const commonPosterUI =
  "flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer";

const PosterSelector = ({ name, selectedPoster, onChange, accept }) => {
  return (
    <div>
      <input
        type="file"
        hidden
        id={name}
        name={name}
        accept={accept}
        onChange={onChange}
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            src={selectedPoster}
            alt="Poster"
            className={commonPosterUI + " object-cover"}
          />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

export default PosterSelector;

const PosterUI = () => {
  return (
    <div className={commonPosterUI}>
      <span className="dark:text-dark-subtle text-light-subtle">
        Select Poster
      </span>
    </div>
  );
};
