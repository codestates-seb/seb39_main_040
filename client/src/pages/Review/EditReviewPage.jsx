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
  // const cafe_id = location.state.cafe_id;
  const cafeId = location.state.cafe_id;
  const reviewId = location.state.review_id;

  const [originReview, setOriginReview] = useState();
  const [originDescription, setOriginDescription] = useState("");
  const [originImg, setOriginImg] = useState("");
  const [originScore, setOriginScore] = useState(0);
  const [originTags, setOriginTags] = useState([]);

  useEffect(() => {
    // let token = localStorage.getItem("access_token");
    // axios.defaults.headers.common["AccessToken"] = `${token}`;
    // axios
    //   .get(`${process.env.REACT_APP_API}/cafe/${cafeId}/reviews/${reviewId}`)
    //   .then((res) => {
    //     setOriginReview(res.data);
    //   });
    async function fetchData() {
      const response = await instance.get(
        `${process.env.REACT_APP_API}/cafe/${cafeId}/reviews/${reviewId}`
      );
      // console.log(response.review_img);
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
        <EditReviewForm
          originReview={originReview}
          originDescription={originDescription}
          originImg={originImg}
          cafeId={cafeId}
          reviewId={reviewId}
          isEdit={true}
        />
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
