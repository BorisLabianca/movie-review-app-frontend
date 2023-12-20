import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";
import { useNotification } from "../../hooks";
import { updateReview } from "../../api/review";
import { useState } from "react";

const EditRatingModal = ({ visible, onClose, onSuccess, initialState }) => {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message } = await updateReview(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    onSuccess({ ...data });
    updateNotification("success", message);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm
        busy={busy}
        initialState={initialState}
        onsubmit={handleSubmit}
      />
    </ModalContainer>
  );
};

export default EditRatingModal;
