import { ReactNode } from "react";
import { ContainerStyle } from "./Container.styled";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return <ContainerStyle className="container">{children}</ContainerStyle>;
};

export default Container;
