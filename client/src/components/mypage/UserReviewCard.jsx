import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Tag from "../common/Tag";
import Swal from "sweetalert2";

const UserReviewCard = ({
  review_id,
  cafe_id,
  cafe_name,
  content,
  star,
  review_img,
  tags,
}) => {
  const reviewDelete = (e) => {
    Swal.fire({
      title: "리뷰를 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--green-010)",
      cancelButtonColor: "var(--red-010)",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        let token = localStorage.getItem("access_token") || "";
        axios.defaults.headers.common["AccessToken"] = `${token}`;
        axios
          .delete(
            `${process.env.REACT_APP_API}/cafe/${cafe_id}/reviews/${review_id}`
          )
          .then(() => {
            Swal.fire({
              title: "리뷰가 삭제되었습니다.",
              icon: "success",
              confirmButtonColor: "var(--green-010)",
            });
            window.location.reload();
          })
          .catch(() => {
            Swal.fire({
              title: "리뷰 삭제를 실패했습니다",
              text: "다시 시도해주세요",
              icon: "error",
              confirmButtonColor: "var(--green-010)",
            });
          });
      }
    });
  };

  return (
    <ReviewCardWrapper>
      <ImgBox>
        <img src={`${review_img}`} alt="리뷰이미지" />
      </ImgBox>
      <ContentBox>
        <h2>{cafe_name}</h2>
        <p>{content}</p>
        <TagBox>
          {tags.map((el) => (
            <Tag className="tag">#{el}</Tag>
          ))}
        </TagBox>
        <StarBox>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Typography component="legend"></Typography>
            <Rating
              className="star-icon"
              name="read-only"
              value={star}
              readOnly
            />
          </Box>
        </StarBox>
      </ContentBox>
      <ButtonBox>
        <Link
          to={`/cafe/${cafe_id}/reviews/${review_id}`}
          state={{
            cafe_id: cafe_id,
            review_id: review_id,
            cafe_name: cafe_name,
          }}
        >
          <button>수정</button>
        </Link>
        <button onClick={reviewDelete}>삭제</button>
      </ButtonBox>
    </ReviewCardWrapper>
  );
};

export default UserReviewCard;

const ReviewCardWrapper = styled.div`
  display: flex;
  border-radius: 8px;
  width: 100%;
  background-color: var(--white-010);
  margin-bottom: 30px;
  &:hover {
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-out;
    transform: scale(1.02);
  }
`;

const ImgBox = styled.div`
  display: flex;
  img {
    width: 180px;
    height: 180px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  justify-content: space-around;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const TagBox = styled.div`
  display: flex;
  margin-top: 10px;

  .tag {
    margin-right: 10px;
  }
`;

const StarBox = styled.div`
  display: flex;
  .star-icon {
    color: var(--green-010);
  }
`;

const ButtonBox = styled.div`
  display: flex;
  width: 19%;
  align-items: flex-end;
  padding: 30px;
  button:hover {
    color: var(--green-010);
  }
`;
