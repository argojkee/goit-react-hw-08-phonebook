import {
  useCustomDispatchContext,
  useCustomStateContext,
} from "context/userContext";
import { FiEdit2 } from "react-icons/fi";
import { Contact } from "types";
import { updateUser } from "context/userContext";
import { toggleModal } from "context/userContext";

const EditContactButton = ({ id, name, number }: Contact) => {
  const { dispatch } = useCustomDispatchContext();

  const handleEditContact = () => {
    dispatch(updateUser({ id, name, number }));
    dispatch(toggleModal(true));
  };

  return (
    <button
      className="button-item edit"
      onClick={handleEditContact}
      type="button"
    >
      <FiEdit2 size={20} />
    </button>
  );
};

export default EditContactButton;
