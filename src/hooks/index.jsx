import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
