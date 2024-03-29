import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { AuthContext } from "../context/AuthProvider";
import { SearchContext } from "../context/SearchProvider";
import { MovieContext } from "../context/MoviesProviders";

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useSearch = () => {
  return useContext(SearchContext);
};

export const useMovies = () => {
  return useContext(MovieContext);
};
