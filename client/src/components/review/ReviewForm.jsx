import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "../common/Button";
import NewTagForm from "./ReviewTag";
import StarRating from "./ReviewStarRating";
import ReviewImageUpload from "./ReviewImageUpload";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1320px;
  height: 1200px;
  margin-top: 150px;
  border: 1px solid black;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 60px;
  span:first-child {
    width: 90px;
    font-size: 18px;
    font-weight: 500;
    margin-left: 30px;
  }
  span:nth-child(2) {
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
  height: 60px;
  margin-bottom: 10px;
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

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 110px;
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

  .star-title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 600px;
    height: 10px;
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

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("");
  const [tags, setTags] = useState();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let content = {
      review_img: 3,
      score: score,
      description: description,
      tags: tags,
    };

    console.log(content);

    axios
      .post(`http://175.125.6.189/cafe/${id}/reviews`, content)
      .then((res) => console.log(res.data))
      .then(() => {
        navigate(`/cafe/${id}`);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onChangeStarHandler = (newStar) => {
    setScore(newStar);
    console.log(newStar);
  };

  const onChangeTagHandler = (newTags) => {
    setTags(newTags);
    console.log(tags);
  };

  return (
    <MainContainer>
      <form onSubmit={onSubmitHandler}>
        <TitleContainer>
          <span>카페명</span>
          <span>Mood</span>
        </TitleContainer>
        <NameContainer>
          <span className="user-name">작성자</span>
          <span className="user">한소희</span>
        </NameContainer>
        <ImgContainer>
          <ReviewImageUpload />
        </ImgContainer>
        <TagContainer>
          <div className="tag-title">
            <span>태그</span>
          </div>
          <div className="tag-container">
            <NewTagForm onChange={onChangeTagHandler} />
          </div>
        </TagContainer>
        <StarContainer>
          <div className="star-title">
            <span>별점</span>
          </div>
          <div className="star-container">
            <StarRating onChange={onChangeStarHandler} />
          </div>
        </StarContainer>
        <TextContainer>
          <div className="text-title">
            <span>한줄평</span>
          </div>
          <textarea
            name="content"
            onChange={(e) => setDescription(e.target.value)}
          />
        </TextContainer>
        <BtnContainer>
          <Button>리뷰등록</Button>
        </BtnContainer>
      </form>
    </MainContainer>
  );
};

export default ReviewForm;
