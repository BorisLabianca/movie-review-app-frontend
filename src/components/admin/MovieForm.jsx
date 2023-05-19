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
import { validateMovie } from "../../utils/validator";

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

const MovieForm = ({ onSubmit, busy }) => {
  const { updateNotification } = useNotification();
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = validateMovie(movieInfo);
    if (error) return updateNotification("error", error);

    const { tags, genres, cast, writers, director, poster } = movieInfo;
    const formData = new FormData();

    const finalMovieInfo = {
      ...movieInfo,
    };

    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);

    const finalCast = cast.map((c) => {
      return {
        actor: c.profile.id,
        roleAs: c.roleAs,
        leadActor: c.leadActor,
      };
    });
    finalMovieInfo.cast = JSON.stringify(finalCast);

    const finalWriters = writers.map((w) => w.id);
    finalMovieInfo.writers = JSON.stringify(finalWriters);

    finalMovieInfo.director = director.id;

    if (poster) finalMovieInfo.poster = poster;
    for (let key in finalMovieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }

    onSubmit(formData);
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

          <Submit
            busy={busy}
            value="Upload"
            onClick={handleSubmit}
            type="button"
          />
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
