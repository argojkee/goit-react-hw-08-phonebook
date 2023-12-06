import DeleteContactButton from "components/DeleteContactButton/DeleteContactButton";
import EditContactButton from "components/EditContactButton/EditContactButton";
import { ContactItemStyle } from "./ContactsItemStyle.styled";
import { IoMdCall } from "react-icons/io";
import { Contact } from "types";

const ContactItem = ({ name, number, id }: Contact) => {
  return (
    <ContactItemStyle id={id}>
      <div className="user-container">
        <p className="name">{name}</p>
        <p className="number">{number}</p>
      </div>

      <ul className="buttons-list">
        <li>
          <a
            className="button-item phone"
            href={`tel:${number.replace("-", "").replace(" ", "")}`}
          >
            <IoMdCall size={20} />
          </a>
        </li>
        <li>
          <EditContactButton id={id} name={name} number={number} />
        </li>
        <li>
          <DeleteContactButton userId={id} />
        </li>
      </ul>
    </ContactItemStyle>
  );
};

export default ContactItem;
