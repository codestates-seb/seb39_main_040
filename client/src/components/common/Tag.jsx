import styled from "styled-components";

const TagItem = styled.div`
  background-color: var(--white-010);
  border: 1px solid var(--green-010);
  border-radius: 20px;
  color: var(--green-010);
  font-size: 12px;
  font-weight: 600;
  width: auto;
  padding: 7px;
  height: 23px;
  line-height: 50%;
`;

const Tag = ({ children }) => {
  return <TagItem>{children}</TagItem>;
};

export default Tag;
