import styled from "styled-components";
import NewImageUpload from "../components/review/NewImageUpload";
import NewReviewForm from "../components/review/NewReviewForm";

const MainWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

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

const NewReviewPage = () => {
  return (
    <MainWrapper>
      <div className="title-container">
        <div className="title">카페 리뷰 작성</div>
      </div>
      <div className="content">
        <NewImageUpload />
        <NewReviewForm />
      </div>
    </MainWrapper>
  );
};

export default NewReviewPage;
