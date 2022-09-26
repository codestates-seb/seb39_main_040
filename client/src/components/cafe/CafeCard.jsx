import { Link } from "react-router-dom";
import styled from "styled-components";

const CafeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //border: 1px solid blue;
  width: 250px;
  height: 330px;
  margin-top: 50px;
  background-color: #f0ece3;
  border-radius: 10px;
`;

// 이미지 (img)
const CafeImg = styled.img`
  position: relative;
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 200px;
`;

// 이름 (title)
const CafeTitle = styled.h2`
  color: #735757;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 10px;
  background: none;
  margin-left: 5px;
`;

// 카페태그 (cafeTag)
const CafeTag = styled.div`
  color: #735757;
  font-size: 1rem;
  margin-top: 10px;
  margin-left: 5px;
  background: none;
`;

const CafeCard = ({ id, title, tags, image }) => {
  return (
    <CafeItemWrapper>
      <Link to={`/cafe/${id}`}>
        <div>
          <CafeImg src={`${image}`} />
        </div>

        <CafeTitle>{title}</CafeTitle>
        <CafeTag>#{tags[0]}</CafeTag>
        <CafeTag>#{tags[1]}</CafeTag>
      </Link>
    </CafeItemWrapper>
  );
};

export default CafeCard;
