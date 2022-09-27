import styled from "styled-components";

const Btn = styled.button`
  width: 100px;
  height: 40px;
  background-color: var(--green-010);
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
`;

const Button = ({ children }) => {
  return <Btn>{children}</Btn>;
};

export default Button;
