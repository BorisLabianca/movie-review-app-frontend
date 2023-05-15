import { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import TagsInput from "../TagsInput";
import Submit from "../form/Submit";
import { useNotification } from "../../hooks";
import WritersModal from "../modals/WritersModal";
import CastForm from "../form/CastForm";
import CastModal from "../modals/CastModal";
import PosterSelector from "../PosterSelector";
import GenresSelector from "../GenresSelector";
import GenresModal from "../modals/GenresModal";
import Selector from "../Selector";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";
import Label from "../Label";
import DirectoSelector from "../DirectoSelector";
import WriterSelector from "../WriterSelector";
import ViewAllButton from "../ViewAllButton";
import LabelWithBadge from "../LabelWithBadge";

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    tags,
    cast,
    director,
    writers,
    releaseDate,
    genres,
    type,
    language,
    status,
  } = movieInfo;

  if (!title.trim()) return { error: "The title is missing." };
  if (!storyLine.trim()) return { error: "The storyline is missing." };

  // Validation for tags, we are checking if tags is an array or not
  if (!tags.length) return { error: "Tags are missing." };
  // Checking if the array is filled with strings
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags." };
  }

  if (!director.name) return { error: "The director is missing." };

  // Validation for writers, we are checking if writers is an array or not
  if (!writers.length) return { error: "Writers are missing." };
  // Checking if the array is filled with objects
  for (let writer of writers) {
    if (typeof writer !== "object") return { error: "Invalid writers." };
  }

  // Validation for cast, we are checking if cast is an array or not
  if (!cast.length) return { error: "Cast & crew are missing." };
  // Checking if the array is filled with objects
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid cast." };
  }

  if (!releaseDate.trim()) return { error: "The releaseDate is missing." };

  // Validation for genres, we are checking if genres is an array or not
  if (!genres.length) return { error: "Genres are missing." };
  // Checking if the array is filled with strings
  for (let genre of genres) {
    if (!genre.trim()) return { error: "Invalid genres." };
  }

  if (!type.trim()) return { error: "The type is missing." };

  if (!language.trim()) return { error: "The language is missing." };
  if (!status.trim()) return { error: "The status is missing." };

  return { error: null };
};

const MovieForm = () => {
  const { updateNotification } = useNotification();
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = validateMovie(movieInfo);
    if (error) return console.log(error);
    console.log(movieInfo);
  };

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }

    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };
  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };
  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "This profile is already selected."
        );
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };
  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };
  const hideWritersModal = () => {
    setShowWritersModal(false);
  };

  const displayWritersModal = () => {
    const { writers } = movieInfo;
    if (!writers.length) {
      return updateNotification("warning", "No writers added yet.");
    }
    setShowWritersModal(true);
  };
  const handleWriterRemoval = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) hideWritersModal();
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const hideCastModal = () => {
    setShowCastModal(false);
  };

  const displayCastModal = () => {
    const { cast } = movieInfo;
    if (!cast.length) {
      return updateNotification("warning", "No cast added yet.");
    }
    setShowCastModal(true);
  };
  const handleCastRemoval = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) hideCastModal();
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };

  const {
    title,
    storyLine,
    writers,
    cast,
    tags,
    genres,
    type,
    language,
    status,
  } = movieInfo;

  return (
    <>
      <div className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              type="text"
              value={title}
              onChange={handleChange}
              name="title"
              id="title"
              placeholder="X-Men"
              className={
                commonInputClasses + " border-b-2 font-semibold text-xl"
              }
            />
          </div>
          <div>
            <Label htmlFor="storyLine">Storyline</Label>
            <textarea
              id="storyLine"
              placeholder="Movie storyline..."
              className={commonInputClasses + " resize-none h-24 border-b-2"}
              value={storyLine}
              onChange={handleChange}
              name="storyLine"
            ></textarea>
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>
          <DirectoSelector onSelect={updateDirector} />
          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>
              <ViewAllButton
                visible={writers.length}
                onClick={displayWritersModal}
              >
                View All
              </ViewAllButton>
            </div>
            <WriterSelector onSelect={updateWriters} />{" "}
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllButton visible={cast.length} onClick={displayCastModal}>
                View All
              </ViewAllButton>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>

          <input
            type="date"
            name="releaseDate"
            className={commonInputClasses + " border-2 rounded p-1 w-auto"}
            onChange={handleChange}
          />

          <Submit value="Upload" onClick={handleSubmit} type="button" />
        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector
            name="poster"
            accept="image/jpg, image/jpeg, image/png"
            label="Select poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
          />
          <GenresSelector onClick={displayGenresModal} badge={genres.length} />
          <Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label="Type"
          />
          <Selector
            onChange={handleChange}
            name="language"
            value={language}
            options={languageOptions}
            label="Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptions}
            label="Status"
          />
        </div>
      </div>
      <WritersModal
        visible={showWritersModal}
        profiles={writers}
        onClose={hideWritersModal}
        onRemoveClick={handleWriterRemoval}
      ></WritersModal>
      <CastModal
        visible={showCastModal}
        casts={cast}
        onClose={hideCastModal}
        onRemoveClick={handleCastRemoval}
      ></CastModal>
      <GenresModal
        visible={showGenresModal}
        onClose={hideGenresModal}
        onSubmit={updateGenres}
        previousSelection={genres}
      />
    </>
  );
};

export default MovieForm;
