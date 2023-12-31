import { useCustomContext } from "context/userEditContext";
import { FiEdit2 } from "react-icons/fi";
import { Contact } from "types";

const EditContactButton = ({ id, name, number }: Contact) => {
  const { setId, setIsShowModal, setName, setNumber } = useCustomContext();

  const handleEditContact = () => {
    setId(id);
    setName(name);
    setNumber(number);
    setIsShowModal(true);
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
