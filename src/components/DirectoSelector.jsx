import { useState } from "react";
import LiveSearch from "./LiveSearch";
import { renderItem } from "../utils/helper";
import { useSearch } from "../hooks";
import { searchActor } from "../api/actor";
import Label from "./Label";

const DirectoSelector = ({ onSelect }) => {
  const { handleSearch, resetSearch } = useSearch();
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleOnChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };

  const handleOnSelect = (profile) => {
    setValue(profile.name);
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };

  return (
    <div>
      <Label htmlFor="director">Director</Label>
      <LiveSearch
        name="director"
        placeholder="Search profile"
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default DirectoSelector;
