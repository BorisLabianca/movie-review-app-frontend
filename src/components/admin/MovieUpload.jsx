import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotification } from "../../hooks";
import { uploadTrailer } from "../../api/movie";
import { useState } from "react";

const MovieUpload = () => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { updateNotification } = useNotification();
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };
  const handleChange = async (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
    const res = await uploadTrailer(formData, setUploadProgress);
    if (!res.error) {
      setVideoUploaded(true);
    }
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Upload progress ${uploadProgress}%`;
  };

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 dark:bg-white dark:bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto p-2">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      </div>
    </div>
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
          <p>Drop your filr here.</p>
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
