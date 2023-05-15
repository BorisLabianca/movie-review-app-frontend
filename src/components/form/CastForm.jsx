import { useState } from "react";
import LiveSearch from "../LiveSearch";
import { commonInputClasses } from "../../utils/theme";
import { useNotification, useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import { searchActor } from "../../api/actor";

// const cast = [{ actor: id, roleAd: "", leadActore: true }];
const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onSubmit }) => {
  const { handleSearch, resetSearch } = useSearch();
  const { updateNotification } = useNotification();
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const { leadActor, profile, roleAs } = castInfo;
  const [profiles, setProfiles] = useState([]);

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name)
      return updateNotification("error", "Cast profile is missing.");
    if (!roleAs.trim())
      return updateNotification("error", "Cast role is missing.");
    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });
    resetSearch();
    setProfiles([]);
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(searchActor, value, setProfiles);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        title="Set as lead actor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={handleOnChange}
      />
      <LiveSearch
        placeholder="Search profile"
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange={handleProfileChange}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className="flex-grow">
        <input
          type="text"
          className={commonInputClasses + " rounded p-1 text-lg border-2 mt-2"}
          placeholder="Role as"
          name="roleAs"
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>

      <button
        className="bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded"
        type="button"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default CastForm;
