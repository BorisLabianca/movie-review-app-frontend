import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotification } from "../../hooks";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import { useState } from "react";
import MovieForm from "./MovieForm";
import ModalContainer from "../modals/ModalContainer";
import { data } from "autoprefixer";

const MovieUpload = ({ visible, onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [trailerInfo, setTrailerInfo] = useState({});
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleUploadTrailer = async (formData) => {
    const { error, url, public_id } = await uploadTrailer(
      formData,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);
    setVideoUploaded(true);
    setTrailerInfo({ url, public_id });
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Upload progress ${uploadProgress}%`;
  };

  const handleSubmit = async (movieInfo) => {
    console.log(trailerInfo);
    if (!trailerInfo.url || !trailerInfo.public_id)
      return updateNotification("error", "The trailer is missing.");
    setBusy(true);
    movieInfo.append("trailer", JSON.stringify(trailerInfo));
    const response = await uploadMovie(movieInfo);
    setBusy(false);
    console.log(response);

    onClose();
  };

  return (
    <ModalContainer visible={visible}>
      <div className="mb-5">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
      </div>
      {!videoSelected ? (
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      ) : (
        <MovieForm
          busy={busy}
          onSubmit={!busy ? handleSubmit : null}
          btnTitle="Upload"
        />
      )}
    </ModalContainer>
  );
};
export default MovieUpload;

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center h-full">
      <FileUploader
        name="file"
        handleChange={handleChange}
        types={["mp4", "avi"]}
        onTypeError={onTypeError}
      >
        <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center text-secondary dark:text-dark-subtle cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here.</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;
  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute left-0 bg-secondary dark:bg-white"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-2">
        {message}
      </p>
    </div>
  );
};
