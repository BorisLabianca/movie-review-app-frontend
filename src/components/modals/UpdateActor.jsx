import { useState } from "react";
import { useNotification } from "../../hooks";
import ModalContainer from "./ModalContainer";
import ActorForm from "../form/ActorForm";
import { updateActor } from "../../api/actor";

const UpdateActor = ({ visible, onClose, initialState }) => {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const handleSubmit = async (data) => {
    console.log(data);
    setBusy(true);
    const { error, actor } = await updateActor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Actor updated successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        title="Update actor"
        btnTitle="Update"
        busy={busy}
        onSubmit={!busy ? handleSubmit : null}
        initialState={initialState}
      />
    </ModalContainer>
  );
};

export default UpdateActor;
