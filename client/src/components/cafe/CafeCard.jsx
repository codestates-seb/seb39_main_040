import { Link } from "react-router-dom";
import styled from "styled-components";
import Tag from "../common/Tag";
import React from "react";

const CafeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  margin-top: 50px;
  background-color: var(--white-010);
  position: relative;
  padding: 0 10px;
  /* border: 1px solid black; */
`;

// 이미지 (img)
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

// 이름 (title)
const CafeTitle = styled.h2`
  width: 300px;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 15px;
  background: none;
  margin-left: 5px;
  color: var(--black-010);
`;

// 카페텍스트
const CafeText = styled.p`
  width: 300px;
  font-size: 1.1rem;
  color: var(--black-010);
  margin-top: 18px;
`;

// 카페태그 (cafeTag)
const CafeTag = styled.div`
  width: 300px;
  display: flex;
  align-items: center;

  font-size: 1rem;
  margin-top: 18px;
  margin-left: 50px;
  position: relative;
  .tag {
    width: auto;
    margin-right: 10px;
  }
`;

const CafeCard = ({ id, title, tags, image }) => {
  return (
    <CafeItemWrapper>
      <Link to={`/cafe/${id}`}>
        {/* <CafeImg src={`${image}`} /> */}
        <CafeImg src="https://i.pinimg.com/564x/f6/7c/2b/f67c2be14cd4ffe78a16289dc995c09e.jpg" />

        <CafeInfoContent>
          {/* <CafeTitle>{title}</CafeTitle> */}
          <CafeTitle>Angel Coffee</CafeTitle>
          <CafeText>크로플이 맛있는 카페</CafeText>

          {/* <CafeTag>#{tags[0]}</CafeTag> */}
          <CafeTag>
            <Tag className="tag">#조용한</Tag>
            <Tag className="tag">#디저트맛집</Tag>
          </CafeTag>
        </CafeInfoContent>
      </Link>
    </CafeItemWrapper>
  );
};

export default CafeCard;
