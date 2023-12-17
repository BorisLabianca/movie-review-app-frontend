import { Routes, Route } from "react-router-dom";

// Components imports
import Navbar from "./components/user/Navbar";
import Home from "./components/Home";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import EmailVerification from "./components/auth/EmailVerification";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NotFound from "./components/NoutFound";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
import SingleMovie from "./components/user/SingleMovie";

function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo?.profile?.role === "admin";

  if (isAdmin) return <AdminNavigator />;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/movie/:movieId" element={<SingleMovie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
