import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NoutFound";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import Actors from "../components/admin/Actors";
import NavbarAdmin from "../components/admin/NavbarAdmin";
import Header from "../components/admin/Header";
import MovieUpload from "../components/admin/MovieUpload";
import { useState } from "react";
import ActorUpload from "../components/modals/ActorUpload";

const AdminNavigator = () => {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);
  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };
  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };
  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };
  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };
  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <NavbarAdmin />
        <div className="flex-1 max-w-screen-xl">
          <Header
            onAddMovieClick={displayMovieUploadModal}
            onAddActorClick={displayActorUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
};

export default AdminNavigator;
