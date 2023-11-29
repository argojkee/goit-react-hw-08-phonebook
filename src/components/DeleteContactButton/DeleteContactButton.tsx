import { RiDeleteBin6Line } from "react-icons/ri";
import { PiSpinnerGap } from "react-icons/pi";
import { useState } from "react";
import { useDeleteContactMutation } from "redux/baseApi";
import { toastSuccess, toastError } from "toastNotification/toastNotification";

type Props = {
  userId: string;
};

const DeleteContactButton = ({ userId }: Props) => {
  const [isCurrentButton, setIsCurrentButton] = useState<boolean>(false);
  const [deleteContact, { isLoading: Deleting }] = useDeleteContactMutation();

  const handleDelete = async () => {
    setIsCurrentButton(true);

    try {
      await deleteContact(userId).unwrap();
      toastSuccess("Contacts has been deleted from your book");
    } catch {
      toastError(
        "Oops... Something went wrong =(. Please, reload page and try again"
      );
    }

    setIsCurrentButton(false);
  };

  return (
    <button
      disabled={Deleting}
      className="button-item delete"
      onClick={handleDelete}
    >
      {Deleting && isCurrentButton ? (
        <PiSpinnerGap className="spinner" size={24} />
      ) : (
        <RiDeleteBin6Line size={24} />
      )}
    </button>
  );
};

export default DeleteContactButton;
