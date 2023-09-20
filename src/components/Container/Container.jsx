import { ContainerStyle } from "./Container.styled";

const Container = ({ children }) => {
  return <ContainerStyle className="container">{children}</ContainerStyle>;
};

export default Container;
