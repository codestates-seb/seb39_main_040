import styled from "styled-components";
import EdiitImageUpload from "../components/review/EditImageUpload";
import EditReviewForm from "../components/review/EditReviewForm";

const MainWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 200px; */

  .title-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 60px;
    background-color: #ae9e8f;
    border-radius: 10px;
    margin: 10px 0;

    .title {
      background-color: inherit;
      color: #fff;
      font-size: 27px;
      font-weight: 600;
    }
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const EditReviewPage = () => {
  return (
    <MainWrapper>
      <div className="title-container">
        <div className="title">카페 리뷰 수정</div>
      </div>
      <div className="content">
        <EdiitImageUpload />
        <EditReviewForm />
      </div>
    </MainWrapper>
  );
};

export default EditReviewPage;
