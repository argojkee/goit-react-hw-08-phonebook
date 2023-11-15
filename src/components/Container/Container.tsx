import { ContainerStyle } from "./Container.styled";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <ContainerStyle className="container">{children}</ContainerStyle>;
};

export default Container;
