import { useState } from "react";
import { useSearch } from "../hooks";
import { renderItem } from "../utils/helper";
import LiveSearch from "./LiveSearch";
import { searchActor } from "../api/actor";

const WriterSelector = ({ onSelect }) => {
  const { handleSearch, resetSearch } = useSearch();
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleOnChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };

  const handleOnSelect = (profile) => {
    setValue("");
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };
  return (
    <LiveSearch
      name="writers"
      placeholder="Search profile"
      results={profiles}
      renderItem={renderItem}
      onSelect={handleOnSelect}
      onChange={handleOnChange}
      value={value}
    />
  );
};

export default WriterSelector;
