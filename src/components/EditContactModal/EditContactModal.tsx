import { createPortal } from 'react-dom';
import { useCustomContext } from 'context/userEditContext';
import EditModalStyled from './EditContactModal.styled';
import EditContactForm from './EditContactForm';
import { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const modalRoot = document.getElementById(
  "contact-edit-modal-root"
) as HTMLDivElement;

const EditContactModal = () => {
  const { name, number, isShowModal, setIsShowModal } = useCustomContext();

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.code !== "Escape") {
        return;
      }
      setIsShowModal(false);
    }
    document.body.style.overflow = 'hidden';
    const paddingOffSet = window.innerWidth - document.body.offsetWidth + 'px';

    document.body.style.paddingRight = paddingOffSet;
    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isShowModal, setIsShowModal]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setIsShowModal(false);
  };

  return createPortal(
    <EditModalStyled onClick={onBackdrop}>
      <div className="modal">
        <button
          type="button"
          className="close-btn"
          onClick={() => setIsShowModal(false)}
        >
          <AiOutlineCloseCircle size={24} />
        </button>
        <h2>
          <span className="first">Edit </span> user
        </h2>
        <ul className="user-info-container">
          <li>
            <p className="user-info-item">
              Current name: <span className="user-info-current">{name}</span>
            </p>
          </li>
          <li>
            <p className="user-info-item">
              Current number:{' '}
              <span className="user-info-current">{number}</span>
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
