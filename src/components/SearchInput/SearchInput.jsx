import { changeFilterValue, getFilter } from "redux/contacts/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { SearchInputStyle } from "./SearchinputStyle";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <SearchInputStyle>
      <h3>Search contact by name or number</h3>
      <div className="input-container">
        <AiOutlineSearch className="search-icon" size={16} />
        <input
          onChange={({ target: { value } }) =>
            dispatch(changeFilterValue(value))
          }
          value={filter}
        />
      </div>
    </SearchInputStyle>
  );
};

export default SearchInput;
