import styled from "styled-components";
import EditReviewForm from "../../components/review/EditReviewForm";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const EditReviewPage = () => {
  const [originReview, setOriginReview] = useState();
  const { cafe_id, review_id } = useParams();
  console.log(cafe_id, review_id);

  useEffect(() => {
    let token = localStorage.getItem("access_token");
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios
      .get(`${process.env.REACT_APP_API}/users/reviews`)
      .then((res) => console.log(res.data.reviews));
  }, []);

  return (
    <EditReviewWrapper>
      <Header />
      <MiddleTitle>리뷰 수정하기</MiddleTitle>
      <FormContent>
        <EditReviewForm />
      </FormContent>
    </EditReviewWrapper>
  );
};

export default EditReviewPage;
