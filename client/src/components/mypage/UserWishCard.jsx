import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../common/Tag";
import { BsSuitHeartFill } from "react-icons/bs";
import axios from "axios";

const WishCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  margin-top: 50px;
  /* margin-bottom: 20px; */
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

const UserWishCard = ({ id, name, tags, img }) => {
  console.log(tags);
  const deleteWishHandler = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_API}/users/wishlist/${id}`)
      .then(() => {
        window.alert("위시리스트 삭제완료");
        window.location.reload();
      })
      .catch((err) => console.log(err.response.status));
  };

  return (
    <WishCardWrapper>
      <Link to={`/cafe/${id}`}>
        <CafeImg src={`${img}`} />
        <CafeInfoContent>
          <CafeTitle>
            {name}
            <button onClick={deleteWishHandler}>
              <BsSuitHeartFill className="fill" />
            </button>
          </CafeTitle>
          {/* <CafeText>{name}</CafeText> */}
          <CafeTag>
            {tags.map((el) => (
              <Tag className="tag">#{el}</Tag>
            ))}
          </CafeTag>
        </CafeInfoContent>
      </Link>
    </WishCardWrapper>
  );
};

export default UserWishCard;
