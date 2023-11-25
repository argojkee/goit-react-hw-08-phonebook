import { EditContactFormStyle } from "./EditContactFormStyle.styled";
import { FiEdit2 } from "react-icons/fi";
import { PiSpinner } from "react-icons/pi";
import { useEditContactMutation, useFetchContactsQuery } from "redux/baseApi";
import { toastSuccess, toastError } from "toastNotification/toastNotification";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ErrorText } from "components/ErrorFormText/ErrorFormTextStyle.styled";
import {
  useCustomDispatchContext,
  useCustomStateContext,
} from "context/userContext";
import { toggleModal } from "context/userContext";

type InitialValuesType = {
  name: string;
  number: string;
};

const initialValues: InitialValuesType = {
  name: "",
  number: "",
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Field name must be 3 symbols minimum")
    .max(16, "Field name must be 16 symbols maximum"),

  number: yup
    .string()
    .min(5, "Field number must be 5 symbols minimum")
    .max(16, "Field number must be 16 symbols minimum"),
});

const EditContactForm = () => {
  const { state } = useCustomStateContext();
  const { dispatch } = useCustomDispatchContext();

  const { data: contacts } = useFetchContactsQuery();

  const [editContact, { isLoading: editing, isError }] =
    useEditContactMutation();

  const handleSubmit = async ({ name: editName, number: editNumber }) => {
    if (!editName && !editNumber) {
      toastError("Please, enter name or number");
      return;
    }

    if (
      contacts.some(
        ({ name, number }) => name === editName || number === editNumber
      )
    ) {
      toastError("Sorry, you already have this contact in your book");
      return;
    }

    const sendingName: string = editName ? editName : state.user.name;
    const sendingNumber: string = editNumber ? editNumber : state.user.number;

    editContact({ id: state.user.id, name: sendingName, number: sendingNumber })
      .then(resp => {
        toastSuccess("Successful!!! Your contact has been edited");
        // setIsShowModal(false);
        dispatch(toggleModal(false));
      })
      .catch(err => {
        toastError(
          "Oops... Something went wrong =(. Please, reload page and try again"
        );
      });
    // if (isError) {
    //   toastError(
    //     "Oops... Something went wrong =(. Please, reload page and try again"
    //   );

    //   return;
    // } else {
    //   toastSuccess("Successful!!! Your contact has been edited");
    //   setIsShowModal(false);
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <EditContactFormStyle autoComplete="off">
        <div className="label-container">
          <Field
            placeholder="Name"
            id="edit-name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            name="name"
            type="text"
          />
          <label htmlFor="edit-name">Name </label>
        </div>
        <div className="label-container">
          <Field
            placeholder="Number"
            id="edit-number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            name="number"
            type="tel"
          />
          <label htmlFor="edit-number">Phone</label>
        </div>

        <button disabled={false} type="submit">
          {editing ? (
            <PiSpinner className="spinner" size={16} />
          ) : (
            <FiEdit2 size={16} />
          )}
          Edit
        </button>
        <ErrorMessage
          name="name"
          component="div"
          render={message => <ErrorText>{message}</ErrorText>}
        />
        <ErrorMessage
          name="number"
          component="div"
          render={message => <ErrorText>{message}</ErrorText>}
        />
      </EditContactFormStyle>
    </Formik>
  );
};

export default EditContactForm;
