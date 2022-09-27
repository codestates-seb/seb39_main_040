import styled from "styled-components";

const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;

  font-size: 25px;
  font-weight: 600;
  text-align: center;
  color: var(--black-010);
  opacity: 0.7;
`;

const MiddleTitle = ({ children }) => {
  return <TitleArea>{children}</TitleArea>;
};

export default MiddleTitle;
