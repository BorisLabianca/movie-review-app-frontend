import { ImSpinner3 } from "react-icons/im";
import ModalContainer from "./ModalContainer";

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  busy,
  title,
  subtitle,
  onClose,
}) => {
  const commonClass = "px-3 py-1 text-white rounded";
  return (
    <ModalContainer visible={visible} ignoreContainer onClose={onClose}>
      <div className="dark:bg-primary bg-white rounded p-3">
        <h1 className="text-red-400 font-semibold text-lg">{title}</h1>
        <p className="text-secondary dark:text-white text-sm">{subtitle}</p>
        <div className="flex items-center space-x-3 mt-3 justify-center">
          {busy ? (
            <p className="flex items-center space-x-2 text-secondary dark:text-white">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait.</span>
            </p>
          ) : (
            <>
              <button
                type="button"
                className={commonClass + " bg-red-400"}
                onClick={onConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className={commonClass + " bg-blue-400"}
                onClick={onCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
