import styled from "styled-components";

export const ContactsPageStyle = styled.section`
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  .container {
    max-width: 600px;
    border: 1px solid black;
    height: 100vh;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    background-color: rgba(255, 255, 224);
    min-height: 100vh;
    height: 100%;

    .page-link {
      width: 30px;
      height: 30px;
      background-color: tomato;
      display: block;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .pagination {
      display: flex;
      column-gap: 10px;
      justify-content: center;
      margin-top: 20px;
    }

    .active .page-link {
      background-color: blue;
      color: white;
    }
  }
`;
