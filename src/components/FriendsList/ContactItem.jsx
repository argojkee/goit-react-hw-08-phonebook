import DeleteContactButton from "components/DeleteContactButton/DeleteContactButton";
import PropTypes from "prop-types";
import EditContactButton from "components/EditContactButton/EditContactButton";
import { ContactItemStyle } from "./ContactsItemStyle.styled";
import { IoMdCall } from "react-icons/io";

const ContactItem = ({ userName, userNumber, id }) => {
  return (
    <ContactItemStyle id={id}>
      <div className="user-container">
        <p className="name">{userName}</p>
        <p className="number">{userNumber}</p>
      </div>

      <ul className="buttons-list">
        <li>
          <a
            className="button-item phone"
            href={`tel:${userNumber.replace("-", "").replace(" ", "")}`}
          >
            <IoMdCall size={20} />
          </a>
        </li>
        <li>
          <EditContactButton id={id} name={userName} number={userNumber} />
        </li>
        <li>
          <DeleteContactButton userId={id} />
        </li>
      </ul>
    </ContactItemStyle>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  userName: PropTypes.string,
  userNumber: PropTypes.string,
  id: PropTypes.string,
};
