import { useEffect, useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import PosterSelector from "../PosterSelector";
import Selector from "../Selector";
import { useNotification } from "../../hooks";
import { ImSpinner3 } from "react-icons/im";

const defaultActorInfo = {
  name: "",
  about: "",
  avatar: null,
  gender: "",
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const validateActor = (actorInfo, initialState) => {
  const { avatar, name, about, gender } = actorInfo;
  if (!name.trim()) return { error: "Actor name is missing." };
  if (!about.trim()) return { error: "The about section is missing." };
  if (!gender.trim()) return { error: "Actor gender is missing." };
  if (!initialState && !avatar)
    return { error: "The actor picture is missing." };
  if (!initialState && !avatar?.type?.startsWith("image"))
    return { error: "Invalid image file." };

  return { error: null };
};

const ActorForm = ({ title, btnTitle, onSubmit, busy, initialState }) => {
  const { updateNotification } = useNotification();
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatarForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);
      return setActorInfo({ ...actorInfo, avatar: file });
    }
    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(actorInfo);
    const { error } = validateActor(actorInfo, initialState);
    if (error) return updateNotification("error", error);
    const formData = new FormData();
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null });
      setSelectedAvatarForUI(initialState.avatar);
    }
  }, [initialState]);

  const { name, about, gender } = actorInfo;
  return (
    <form
      className="dark:bg-primary bg-white p-3 w-[35rem] rounded"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="h-8 w-24 bg-primary text-white dark:bg-white dark:text-primary opacity-80 transition rounded flex items-center justify-center"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>
      <div className="flex space-x-2">
        <PosterSelector
          className="w-36 h-36 aspect-square object-cover"
          selectedPoster={selectedAvatarForUI}
          accept="image/jpg, image/jpeg, image/png"
          name="avatar"
          label="Select avatar"
          onChange={handleChange}
        />
        <div className="flex flex-grow flex-col space-y-2">
          <input
            placeholder="Enter the name"
            type="text"
            className={commonInputClasses + " border-b-2"}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <textarea
            name="about"
            value={about}
            placeholder="About..."
            className={commonInputClasses + " border-b-2 resize-none h-full"}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="mt-3">
        <Selector
          options={genderOptions}
          label="Gender"
          value={gender}
          onChange={handleChange}
          name="gender"
        />
      </div>
    </form>
  );
};

export default ActorForm;
