import styled from "styled-components";
import React from "react";

const Tag = (props) => {
  return <TagItem className={props.className}>{props.children}</TagItem>;
};

export default Tag;

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
