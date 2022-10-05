import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Tag from "../common/Tag";
import { BsSuitHeartFill } from "react-icons/bs";
import Swal from "sweetalert2";

const UserWishCard = ({ id, name, tags, img }) => {
  console.log(tags);
  const deleteWishHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "위시리스트를 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--green-010)",
      cancelButtonColor: "var(--red-010)",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API}/users/wishlist/${id}`)
          .then(() => {
            Swal.fire({
              title: "위시리스트가 삭제되었습니다.",
              icon: "success",
              confirmButtonColor: "var(--green-010)",
            });
            window.location.reload();
          })
          .catch(() => {
            Swal.fire({
              title: "위시리스트 삭제를 실패했습니다",
              text: "다시 시도해주세요",
              icon: "error",
              confirmButtonColor: "var(--green-010)",
            });
          });
      }
    });
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

const WishCardWrapper = styled.div`
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
  display: flex;
  flex-direction: row;
  width: 300px;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 15px;
  background: none;
  margin-left: 5px;
  color: var(--black-010);

  button {
    color: var(--green-010);
    font-size: 20px;
    top: 71%;
    right: 64%;
    cursor: pointer;
  }
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
