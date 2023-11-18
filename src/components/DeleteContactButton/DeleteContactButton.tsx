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
  const [deleteContact, { isLoading: Deleting, isError }] =
    useDeleteContactMutation();

  const handleDelete = async () => {
    setIsCurrentButton(true);
    await deleteContact(userId);

    if (isError) {
      toastError(
        "Oops... Something went wrong =(. Please, reload page and try again"
      );
    } else {
      toastSuccess("Contacts has been deleted from your book");
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


