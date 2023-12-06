import styled from "styled-components";

export const UserMenuStyle = styled.ul`
  flex-direction: column;
  row-gap: 10px;
  .user-email {
    color: blue;
  }

  button {
    background-color: blue;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 12px;
    color: white;
    column-gap: 8px;
    transition: 250ms linear;
  }

  button:hover,
  button:focus {
    background-color: tomato;
  }
`;
