import styled from "styled-components";
import EditReviewForm from "../../components/review/EditReviewForm";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import React, { useEffect } from "react";
import { useState } from "react";
// import axios from "axios";
import { useLocation } from "react-router-dom";
import instance from "../../api/core";

const EditReviewPage = () => {
  const location = useLocation();
  const cafeId = location.state.cafe_id;
  const reviewId = location.state.review_id;
  const cafe_name = location.state.cafe_name;

  const [originReview, setOriginReview] = useState("");
  const [originDescription, setOriginDescription] = useState("");
  const [originImg, setOriginImg] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await instance.get(
        `${process.env.REACT_APP_API}/cafe/${cafeId}/reviews/${reviewId}`
      );
      setOriginReview(response);
      setOriginDescription(response.description);
      setOriginImg(response.review_img);
    }
    fetchData();
  }, []);

  return (
    <EditReviewWrapper>
      <Header />
      <MiddleTitle>리뷰 수정하기</MiddleTitle>
      <FormContent>
        {originReview && (
          <EditReviewForm
            originReview={originReview}
            originDescription={originDescription}
            originImg={originImg}
            cafeId={cafeId}
            reviewId={reviewId}
            isEdit={true}
            cafe_name={cafe_name}
          />
        )}
      </FormContent>
    </EditReviewWrapper>
  );
};

export default EditReviewPage;

const EditReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
