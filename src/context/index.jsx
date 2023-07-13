import AuthProvider from "./AuthProvider";
import MoviesProviders from "./MoviesProviders";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";

const ContextProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <SearchProvider>
        <MoviesProviders>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </MoviesProviders>
      </SearchProvider>
    </NotificationProvider>
  );
};

export default ContextProviders;
