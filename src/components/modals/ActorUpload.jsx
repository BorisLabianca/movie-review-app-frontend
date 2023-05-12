import { useState } from "react";
import { createActor } from "../../api/actor";
import { useNotification } from "../../hooks";
import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const handleSubmit = async (data) => {
    // console.log(data);
    setBusy(true);
    const { error, actor } = await createActor(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Actor created successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        title="Create new actor"
        btnTitle="Create"
        busy={busy}
        onSubmit={!busy ? handleSubmit : null}
      />
    </ModalContainer>
  );
};

export default ActorUpload;
