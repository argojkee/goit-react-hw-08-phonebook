import { useAddContactMutation, useFetchContactsQuery } from "redux/baseApi";
import { PiSpinnerGap } from "react-icons/pi";
import AddContactFormStyle from "./FormStyle.styled";
import { GrAdd } from "react-icons/gr";
import { toastSuccess, toastError } from "toastNotification/toastNotification";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { ErrorText } from "components/ErrorFormText/ErrorFormTextStyle.styled";

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
    .max(16, "Field name must be 16 symbols maximum")
    .required("Field name is required"),

  number: yup
    .string()
    .min(5, "Field number must be 5 symbols minimum")
    .max(16, "Field number must be 16 symbols minimum")
    .required("Field number is required"),
});

const AddContactForm = () => {
  const { data: contacts, isError: errorFetch } = useFetchContactsQuery();

  const [addContact, { isLoading: isAdding, isError: errorAdd, error }] =
    useAddContactMutation();

  // const handlerChangeInput = () => {
  // if (target.name === "name") {
  //   setName(target.value);
  // } else {
  //   setNumber(target.value);
  // }
  // };

  const handlerSubmitForm = async (
    { name: addingName, number: addingNumber },
    { resetForm }
  ) => {
    if (
      contacts.some(
        ({ name, number }) => name === addingName || number === addingNumber
      )
    ) {
      toastError("Sorry, you already have this contact in your book");
      return;
    }

    addContact({ name: addingName, number: addingNumber })
      .unwrap()
      .then(resp => {
        toastSuccess("Contact has been added to your book");
        resetForm();
      })
      .catch(err => {
        toastError(
          "Oops... Something went wrong =(. Please, reload page and try again"
        );
      });

    // await addContact({ name: addingName, number: addingNumber });

    //*
    // console.log(errorAdd);
    // await addContact({ name: "", number: "" }).unwrap();
    // console.log(errorAdd);

    //*
    // console.log(isError);
    // if (isError) {
    //   toastError(
    //     "Oops... Something went wrong =(. Please, reload page and try again"
    //   );
    //   return;
    // } else {
    //   toastSuccess("Contact has been added to your book");
    //   resetForm();
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handlerSubmitForm}
      validationSchema={schema}
    >
      <AddContactFormStyle autoComplete="off">
        <h2>
          <span className="first">Add </span>contact
        </h2>
        <div className="add-contact-label-container">
          <Field
            id="add-name"
            placeholder="Name"
            // value={name}
            // onChange={handlerChangeInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="add-name">Name</label>
        </div>
        <div className="add-contact-label-container">
          <Field
            id="add-number"
            placeholder="Number"
            // value={number}
            // onChange={handlerChangeInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <label htmlFor="add-number">Phone </label>
        </div>

        <button type="submit">
          {isAdding ? (
            <PiSpinnerGap className="spinner" size={16} />
          ) : (
            <GrAdd size={16} />
          )}
          Add contact
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
      </AddContactFormStyle>
    </Formik>
  );
};

export default AddContactForm;
