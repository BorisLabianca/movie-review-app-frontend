import { useParams } from "react-router-dom";
import { addReview } from "../../api/review";
import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";
import { useNotification } from "../../hooks";

const AddRatingModal = ({ visible, onClose, onSuccess }) => {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReview(movieId, data);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onsubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default AddRatingModal;
