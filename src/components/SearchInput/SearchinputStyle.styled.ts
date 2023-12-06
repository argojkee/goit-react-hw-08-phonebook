import styled from "styled-components";

export const SearchInputStyle = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 99, 71, 0.75);
  border-radius: 12px;
  border: 1px solid black;
  margin-top: 8px;
  h3 {
    margin-bottom: 10px;
  }

  input {
    height: 20px;
    border-radius: 12px;
    padding-left: 8px;
  }
  .input-container {
    position: relative;
    display: inline;
  }

  .search-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translate(0, -50%);
  }
`;
