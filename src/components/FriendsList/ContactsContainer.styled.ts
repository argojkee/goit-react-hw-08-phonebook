import styled from "styled-components";

export const ContactsContainerStyle = styled.div`
  .error {
    color: red;
  }

  .notification {
    color: tomato;
    margin-top: 20px;
  }
  #fountainG {
    position: relative;
    width: 234px;
    height: 28px;
    margin: auto;
    top: 20px;
  }

  .fountainG {
    position: absolute;
    top: 0;
    background-color: transparent;
    width: 28px;
    height: 28px;
    animation-name: bounce_fountainG;
    -o-animation-name: bounce_fountainG;
    -ms-animation-name: bounce_fountainG;
    -webkit-animation-name: bounce_fountainG;
    -moz-animation-name: bounce_fountainG;
    animation-duration: 0.775s;
    -o-animation-duration: 0.775s;
    -ms-animation-duration: 0.775s;
    -webkit-animation-duration: 0.775s;
    -moz-animation-duration: 0.775s;
    animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-direction: normal;
    -o-animation-direction: normal;
    -ms-animation-direction: normal;
    -webkit-animation-direction: normal;
    -moz-animation-direction: normal;
    transform: scale(0.3);
    -o-transform: scale(0.3);
    -ms-transform: scale(0.3);
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    border-radius: 19px;
    -o-border-radius: 19px;
    -ms-border-radius: 19px;
    -webkit-border-radius: 19px;
    -moz-border-radius: 19px;
  }

  #fountainG_1 {
    left: 0;
    animation-delay: 0.316s;
    -o-animation-delay: 0.316s;
    -ms-animation-delay: 0.316s;
    -webkit-animation-delay: 0.316s;
    -moz-animation-delay: 0.316s;
  }

  #fountainG_2 {
    left: 29px;
    animation-delay: 0.3925s;
    -o-animation-delay: 0.3925s;
    -ms-animation-delay: 0.3925s;
    -webkit-animation-delay: 0.3925s;
    -moz-animation-delay: 0.3925s;
  }

  #fountainG_3 {
    left: 58px;
    animation-delay: 0.469s;
    -o-animation-delay: 0.469s;
    -ms-animation-delay: 0.469s;
    -webkit-animation-delay: 0.469s;
    -moz-animation-delay: 0.469s;
  }

  #fountainG_4 {
    left: 88px;
    animation-delay: 0.5455s;
    -o-animation-delay: 0.5455s;
    -ms-animation-delay: 0.5455s;
    -webkit-animation-delay: 0.5455s;
    -moz-animation-delay: 0.5455s;
  }

  #fountainG_5 {
    left: 117px;
    animation-delay: 0.622s;
    -o-animation-delay: 0.622s;
    -ms-animation-delay: 0.622s;
    -webkit-animation-delay: 0.622s;
    -moz-animation-delay: 0.622s;
  }

  #fountainG_6 {
    left: 146px;
    animation-delay: 0.6985s;
    -o-animation-delay: 0.6985s;
    -ms-animation-delay: 0.6985s;
    -webkit-animation-delay: 0.6985s;
    -moz-animation-delay: 0.6985s;
  }

  #fountainG_7 {
    left: 175px;
    animation-delay: 0.775s;
    -o-animation-delay: 0.775s;
    -ms-animation-delay: 0.775s;
    -webkit-animation-delay: 0.775s;
    -moz-animation-delay: 0.775s;
  }

  #fountainG_8 {
    left: 205px;
    animation-delay: 0.8615s;
    -o-animation-delay: 0.8615s;
    -ms-animation-delay: 0.8615s;
    -webkit-animation-delay: 0.8615s;
    -moz-animation-delay: 0.8615s;
  }

  @keyframes bounce_fountainG {
    0% {
      transform: scale(1);
      background-color: rgb(38, 0, 252);
    }

    100% {
      transform: scale(0.3);
      background-color: rgb(255, 255, 255);
    }
  }

  @-o-keyframes bounce_fountainG {
    0% {
      -o-transform: scale(1);
      background-color: rgb(38, 0, 252);
    }

    100% {
      -o-transform: scale(0.3);
      background-color: rgb(255, 255, 255);
    }
  }

  @-ms-keyframes bounce_fountainG {
    0% {
      -ms-transform: scale(1);
      background-color: rgb(38, 0, 252);
    }

    100% {
      -ms-transform: scale(0.3);
      background-color: rgb(255, 255, 255);
    }
  }

  @-webkit-keyframes bounce_fountainG {
    0% {
      -webkit-transform: scale(1);
      background-color: rgb(38, 0, 252);
    }

    100% {
      -webkit-transform: scale(0.3);
      background-color: rgb(255, 255, 255);
    }
  }

  @-moz-keyframes bounce_fountainG {
    0% {
      -moz-transform: scale(1);
      background-color: rgb(38, 0, 252);
    }

    100% {
      -moz-transform: scale(0.3);
      background-color: rgb(255, 255, 255);
    }
  }
`;
