import { styled } from "styled-components";

const AddContactFormStyle = styled.form`
  max-width: 600px;
  text-align: center;
  border: 1px solid black;
  border-radius: 20px;
  max-height: 300px;
  min-height: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
  row-gap: 40px;
  display: flex;
  flex-direction: column;

  margin-left: auto;
  margin-right: auto;
  background-color: rgba(244, 164, 96, 0.3);

  .first {
    color: blue;
  }

  .add-contact-label-container {
    width: 180px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    display: inline-block;
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
    width: 140px;
    height: 40px;
  }

  button:hover,
  button:focus {
    background-color: tomato;
  }

  button[disabled] {
    background-color: gray;
  }

  .notify {
    margin-top: -20px;
  }

  .notify.ok {
    color: blue;
  }

  .notify.error {
    color: red;
  }
`;

export default AddContactFormStyle;
