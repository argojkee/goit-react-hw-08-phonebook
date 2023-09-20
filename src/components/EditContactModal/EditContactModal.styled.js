import styled from "styled-components";

const EditModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: 250ms linear;

  .modal {
    position: relative;
    width: 500px;
    height: 400px;
    max-width: 95%;
    max-height: 95%;
    position: absolute;
    background-color: rgba(255, 248, 220, 1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 50px 20px;
    text-align: center;
  }
  .first {
    color: tomato;
  }

  .user-info-container {
    text-align: start;
    font-size: 20px;
    margin-bottom: 20px;
    word-wrap: break-word;
    max-width: 500px;
  }

  .user-info-item {
    color: tomato;
  }

  .user-info-current {
    color: blue;
  }

  h2 {
    margin-bottom: 20px;
  }

  .close-btn {
    position: absolute;
    right: 30px;
    top: 18px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    color: tomato;
    transition: 250ms linear;
  }

  .close-btn:hover,
  .close-btn:focus {
    color: blue;
  }
`;

export default EditModalStyled;
