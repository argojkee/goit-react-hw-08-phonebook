import styled from 'styled-components';

export const EditContactFormStyle = styled.form`
  width: 80%;
  background-color: rgba(244, 164, 96, 0.3);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding: 40px 10px;
  border-radius: 20px;
  margin-top: 40px;
  border: 1px solid black;
  .label-container {
    width: 180px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    display: inline-block;
  }

  .notify {
    color: blue;
  }
  .invalid {
    color: red;
  }

  .invalid,
  .notify {
    margin-top: -20px;
  }

  label {
    position: absolute;
    left: 8px;
    bottom: 50%;
    transition: 250ms linear;
    transform: translate(0, 50%);
    font-size: 14px;
    color: blue;
  }

  input:focus + label {
    transform: translateY(-100%);
  }

  input:not(:placeholder-shown) + label {
    transform: translateY(-100%);
  }

  input {
    border-radius: 8px;
    padding-left: 10px;
    height: 20px;
  }

  input::placeholder {
    opacity: 0;
  }

  button {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 8px;
    padding: 8px 12px;
    background-color: blue;
    color: white;
    transition: 250ms linear;
    column-gap: 8px;
  }

  button:hover,
  button:focus {
    background-color: tomato;
  }

  button[disabled] {
    background-color: gray;
  }
`;
