import { ModalProps } from "../../utils/interfaces/shared-interfaces";

export const Modal: React.FC<ModalProps> = ({
  className = "",
  toggleModal,
  children,
}) => {
  return (
    <div
      onClick={(_) => toggleModal(false)}
      className="top-0 left-0 bg-hedera-secondary bg-opacity-50 h-full w-full fixed flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()} className={className}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
