import { createContext, useState } from "react";
import { useNotification } from "../hooks";

export const SearchContext = createContext();

let timeOutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchProvider = ({ children }) => {
  const { updateNotification } = useNotification();
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const search = async (method, query, updaterFunc) => {
    const { error, results } = await method(query);
    if (error) return updateNotification("error", error);

    if (!results.length) return setResultNotFound(true);

    setResults(results);
    updaterFunc && updaterFunc([...results]);
  };
  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultNotFound(false);
  };
  const debounceFunc = debounce(search, 500);

  const handleSearch = (method, query, updaterFunc) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFunc && updaterFunc([]);
      resetSearch();
    }

    debounceFunc(method, query, updaterFunc);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, resetSearch, searching, resultNotFound, results }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
