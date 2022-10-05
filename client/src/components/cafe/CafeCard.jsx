import { Link } from "react-router-dom";
import styled from "styled-components";
import Tag from "../common/Tag";
import React from "react";

const CafeCard = ({ id, title, tags, image, text }) => {
  return (
    <CafeItemWrapper>
      <Link to={`/cafe/${id}`}>
        <CafeImg src={`${image}`} />
        <CafeInfoContent>
          <CafeTitle>{title}</CafeTitle>
          <CafeText>{text}</CafeText>
          <CafeTag>
            {tags.map((el) => (
              <Tag className="tag">#{el}</Tag>
            ))}
          </CafeTag>
        </CafeInfoContent>
      </Link>
    </CafeItemWrapper>
  );
};

export default CafeCard;

const CafeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  margin-top: 50px;
  background-color: var(--white-010);
  position: relative;
  padding: 0 10px;
`;

const CafeImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 8px;
  :hover {
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-out;
    transform: scale(1.02);
  }
  :not(:hover) {
    transition: 0.2s ease-out;
  }
`;

const CafeInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CafeTitle = styled.h2`
  width: 300px;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 15px;
  background: none;
  margin-left: 5px;
  color: var(--black-010);
`;

const CafeText = styled.p`
  width: 300px;
  font-size: 1.1rem;
  color: var(--black-010);
  margin-top: 18px;
  line-height: 30px;
`;

const CafeTag = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  font-size: 1rem;
  margin-top: 10px;
  margin-left: 50px;
  position: relative;
  .tag {
    width: auto;
    margin-right: 10px;
    margin-bottom: 8px;
  }
`;
