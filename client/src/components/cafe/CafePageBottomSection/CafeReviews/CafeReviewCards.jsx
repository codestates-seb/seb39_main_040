import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CafeReviewCard from "./CafeReviewCard";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import useLoginStore from "../../../../store/useLoginStore";
import Swal from "sweetalert2";

const CafeReviewCards = () => {
  const [reviewInfo, setReviewInfo] = useState([]);
  const { id } = useParams();
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cafe/${id}/reviews`)
      .then((res) => {
        setReviewInfo(res.data.data);
      })
      .catch((e) => console.err("error:", e));
  }, []);

  const newReviewHandler = (e) => {
    e.preventDefault();
    if (isLogin === true) {
      navigate(`/cafe/${id}/reviews`);
    } else {
      Swal.fire({
        title: "로그인 후 이용해주세요.",
        text: "로그인 후 리뷰를 작성하실 수 있습니다.",
        confirmButtonColor: "var(--green-010)",
      });
      navigate("/login");
    }
  };

  return (
    <ReviewCardsWrapper>
      <IconBox>
        <span className="tooltip">
          <FontAwesomeIcon
            className="icon"
            icon={faPenToSquare}
            onClick={newReviewHandler}
          />
          <span className="tooltip-text">리뷰쓰기</span>
        </span>
      </IconBox>
      {reviewInfo.length === 0 ? (
        <div className="no-review">등록된 리뷰가 없습니다.</div>
      ) : (
        <></>
      )}
      {reviewInfo.map((el) => (
        <CafeReviewCard
          key={el.id}
          text={el.description}
          tag={el.tags}
          user={el.user}
          image={el.review_img}
          star={el.score}
        />
      ))}
    </ReviewCardsWrapper>
  );
};

export default CafeReviewCards;

const ReviewCardsWrapper = styled.div`
  margin-top: 20px;
  width: 870px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .no-review {
    color: var(--gray-020);
    font-size: 25px;
    height: 500px;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px 900px;
  .tooltip {
    display: inline-block;
    cursor: pointer;
    .tooltip-text {
      z-index: 100;
      display: none;
      position: absolute;
      max-width: 200px;
      box-shadow: rgba(149, 157, 165, 0.1) 0px 4px 10px;
      padding: 5px;
      font-size: 14px;
      color: var(--black-010);
      background: var(--gray-010);
    }
  }

  .tooltip:hover .tooltip-text {
    display: block;
  }

  .icon {
    margin: 2px 5px 0 0;
    color: var(--green-010);
    width: 25px;
    height: 25px;
  }
`;
