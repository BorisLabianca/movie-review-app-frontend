import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm title="Create new actor" btnTitle="Create" />
    </ModalContainer>
  );
};

export default ActorUpload;
