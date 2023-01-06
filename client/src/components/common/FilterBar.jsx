import styled from "styled-components";
import React, { useState, useEffect } from "react";

const FilterBar = ({ setTargetFilter }) => {
  const [currentClick, setCurrentClick] = useState(`all`);
  const [prevClick, setPrevClick] = useState(null);

  useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.textDecoration = "underline";
        current.style.fontWeight = "600";
      }
      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.textDecoration = "none";
        prev.style.fontWeight = "400";
      }
      setPrevClick(currentClick);
    },
    [currentClick]
  );

  const onClickHandler = (e) => {
    setTargetFilter(e.target.value);
    setCurrentClick(e.target.id);
  };

  return (
    <TagContainer>
      <button value={`all`} id="all" onClick={onClickHandler}>
        ALL
      </button>
      <button value={`study`} id="study" onClick={onClickHandler}>
        STUDY
      </button>
      <button value={`mood`} id="mood" onClick={onClickHandler}>
        MOOD
      </button>
      <button value={`tasty`} id="tasty" onClick={onClickHandler}>
        TASTY
      </button>
    </TagContainer>
  );
};

export default FilterBar;

const TagContainer = styled.div`
  width: 400px;
  button {
    font-size: 18px;
    padding: 0 15px;
    cursor: pointer;
    width: 100px;
  }
  button:hover {
    text-decoration: underline;
    font-weight: 600;
  }
  button:nth-child(1) {
    border-right: 1px solid var(--gray-020);
    width: 80px;
  }
  button:nth-child(2) {
    border-right: 1px solid var(--gray-020);
  }
  button:nth-child(3) {
    border-right: 1px solid var(--gray-020);
  }
`;
