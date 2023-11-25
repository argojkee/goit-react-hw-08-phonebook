import { createPortal } from "react-dom";
import EditModalStyled from "./EditContactModal.styled";
import EditContactForm from "./EditContactForm";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  useCustomDispatchContext,
  useCustomStateContext,
} from "context/userContext";
import { toggleModal } from "context/userContext";

const modalRoot = document.getElementById(
  "contact-edit-modal-root"
) as HTMLDivElement;

const EditContactModal = () => {
  const { state } = useCustomStateContext();
  const { dispatch } = useCustomDispatchContext();

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.code !== "Escape") {
        return;
      }
      dispatch(toggleModal(true));
      // setIsShowModal(false);
    }
    document.body.style.overflow = "hidden";
    const paddingOffSet = window.innerWidth - document.body.offsetWidth + "px";

    document.body.style.paddingRight = paddingOffSet;
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [dispatch]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(toggleModal(false));
  };

  return createPortal(
    <EditModalStyled onClick={onBackdrop}>
      <div className="modal">
        <button
          type="button"
          className="close-btn"
          onClick={() => dispatch(toggleModal(false))}
        >
          <AiOutlineCloseCircle size={24} />
        </button>
        <h2>
          <span className="first">Edit </span> user
        </h2>
        <ul className="user-info-container">
          <li>
            <p className="user-info-item">
              Current name:{" "}
              <span className="user-info-current">{state.user.name}</span>
            </p>
          </li>
          <li>
            <p className="user-info-item">
              Current number:{" "}
              <span className="user-info-current">{state.user.number}</span>
            </p>
          </li>
        </ul>

        <EditContactForm />
      </div>
    </EditModalStyled>,
    modalRoot
  );
};

export default EditContactModal;
