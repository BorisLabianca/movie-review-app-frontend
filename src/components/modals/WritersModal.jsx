import { AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

const WritersModal = ({ profiles = [], visible, onClose, onRemoveClick }) => {
  const handleClick = (event) => {
    if (event.target.id === "modal-container") onClose();
  };
  if (!visible) return null;

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {profiles.map(({ id, name, avatar }) => {
          return (
            <div className="flex space-x-3" key={id}>
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 aspect-square rounded object-cover"
              />
              <p className="font-semibold dark:text-white text-primary w-full">
                {name}
              </p>
              <button
                type="button"
                className="dark:text-white text-primary hover:opacity-80 transition p-2"
                onClick={() => {
                  onRemoveClick(id);
                }}
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default WritersModal;
