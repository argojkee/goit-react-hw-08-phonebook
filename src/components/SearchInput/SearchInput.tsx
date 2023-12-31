import { changeFilterValue, getFilter } from "redux/contacts/filterSlice";
import { useAppSelector } from "../../redux/hooks";
import { SearchInputStyle } from "./SearchinputStyle.styled";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch } from "../../redux/hooks";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(getFilter);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterValue(value));
  };

  return (
    <SearchInputStyle>
      <h3>Search contact by name or number</h3>
      <div className="input-container">
        <AiOutlineSearch className="search-icon" size={16} />
        <input value={filter} onChange={handleChange} />
      </div>
    </SearchInputStyle>
  );
};

export default SearchInput;
