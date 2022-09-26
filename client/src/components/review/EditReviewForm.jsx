import styled from "styled-components";
import Button from "../ui/Button";
import NewTagForm from "./NewTagForm";
import StarRating from "./StarRating";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  height: 600px;
  margin-left: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 50px;
  .title-name {
    width: 90px;
    font-size: 18px;
    font-weight: 500;
    margin-left: 30px;
  }
  .title {
    width: 490px;
    font-size: 17px;
    font-weight: 500;
  }
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 50px;
  .user-name {
    width: 90px;
    font-size: 18px;
    font-weight: 500;
    margin-left: 30px;
  }
  .user {
    width: 490px;
    font-size: 17px;
    font-weight: 500;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 150px;
  .tag-title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 600px;
    height: 40px;
    span {
      position: absolute;
      left: 0;
      font-size: 18px;
      font-weight: 500;
      margin-left: 30px;
    }
  }
  .tag-container {
    width: 600px;
    height: 110px;
    margin-left: 60px;
  }
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 110px;
  margin-top: 15px;
  .star-title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 600px;
    height: 40px;
    span {
      position: absolute;
      left: 0;
      font-size: 18px;
      font-weight: 500;
      margin-left: 30px;
    }
  }
  .star-container {
    width: 600px;
    height: 70px;
    margin-left: 60px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 110px;
  margin-top: 15px;

  .text-title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 600px;
    height: 40px;
    span {
      position: absolute;
      left: 0;
      font-size: 18px;
      font-weight: 500;
      margin-left: 30px;
    }
  }
  textarea {
    border: none;
    background-color: #f0ece3;
    width: 600px;
    height: 70px;
    margin-left: 60px;
    font-size: 17px;
    padding: 10px;
  }
  textarea:focus {
    outline: none;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  margin: 30px 0 0 560px;
`;

const EditReviewForm = () => {
  return (
    <MainContainer>
      <form>
        <TitleContainer>
          <span className="title-name">카페명</span>
          <span className="title">Mood</span>
        </TitleContainer>
        <NameContainer>
          <span className="user-name">작성자</span>
          <span className="user">한소희</span>
        </NameContainer>
        <TagContainer>
          <div className="tag-title">
            <span>태그</span>
          </div>
          <div className="tag-container">
            <NewTagForm />
          </div>
        </TagContainer>
        <StarContainer>
          <div className="star-title">
            <span>별점</span>
          </div>
          <div className="star-container">
            <StarRating />
          </div>
        </StarContainer>
        <TextContainer>
          <div className="text-title">
            <span>한줄평</span>
          </div>
          <textarea name="content" />
        </TextContainer>
        <BtnContainer>
          <Button>리뷰수정</Button>
        </BtnContainer>
      </form>
    </MainContainer>
  );
};

export default EditReviewForm;
