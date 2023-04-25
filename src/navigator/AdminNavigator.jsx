import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NoutFound";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import Actors from "../components/admin/Actors";
import NavbarAdmin from "../components/admin/NavbarAdmin";

const AdminNavigator = () => {
  return (
    <div className="flex">
      <NavbarAdmin />
      <div className="flex-1 p-2 max-w-screen-xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;
