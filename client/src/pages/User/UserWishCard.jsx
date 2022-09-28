import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../common/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const WishCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  margin-top: 50px;
  margin-bottom: 20px;
  background-color: var(--white-010);
  position: relative;
  padding: 0 10px;
  //border: 1px solid blue;
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

  button {
    position: absolute;
    color: var(--green-010);
    font-size: 20px;
    top: 71%;
    right: 64%;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-out;
    transform: scale(1.02);
  }
`;

const CafeText = styled.p`
  width: 300px;
  font-size: 1.1rem;
  color: var(--black-010);
  margin-top: 18px;
  margin-left: 5px;
`;

const CafeTag = styled.div`
  width: 300px;
  display: flex;
  align-items: center;

  font-size: 1rem;
  margin-top: 18px;
  margin-left: 5px;
  position: relative;
  .tag {
    width: auto;
    margin-right: 10px;
  }
`;

const UserWishCard = () => {
  return (
    <WishCardWrapper>
      <Link to={`/cafe/1`}>
        <CafeImg src="https://i.pinimg.com/564x/f6/7c/2b/f67c2be14cd4ffe78a16289dc995c09e.jpg" />
        <CafeInfoContent>
          <CafeTitle>
            MODE
            <button>
              <FontAwesomeIcon className="icon" icon={faHeart} />
              <button class="bth"></button>
            </button>
          </CafeTitle>
          <CafeText>커피가 맛있는 분위기 맛집</CafeText>
          <CafeTag>
            <Tag className="tag">#분위기좋은</Tag>
            <Tag className="tag">#커피가맛있는</Tag>
          </CafeTag>
        </CafeInfoContent>
      </Link>
    </WishCardWrapper>
  );
};

export default UserWishCard;
