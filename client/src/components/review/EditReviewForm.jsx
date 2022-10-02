import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "../common/Button";
import NewTagForm from "./ReviewTag";
import StarRating from "./ReviewStarRating";

const ReviewForm = ({ cafeId, reviewId, cafe_name, originReview }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState();
  const [score, setScore] = useState(0);
  const [tags, setTags] = useState([]);
  const [img, setImg] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [imgInfo, setImgInfo] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const content = {
      review_img: img,
      score: score,
      description: description,
      tags: tags,
    };

    // console.log(content);

    if (description && score && tags && img) {
      axios
        .patch(
          `${process.env.REACT_APP_API}/cafe/${cafeId}/reviews/${reviewId}`,
          content,
          {
            headers: { AccessToken: localStorage.getItem("access_token") },
          }
        )
        .then((res) => {
          console.log(res.data);
          console.log("리뷰수정완료");
          alert("리뷰가 수정되었습니다.");
          // navigate(`/cafe/${cafeId}`);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else if (!tags) {
      alert("태그를 두개 이상 선택해주세요.");
    } else if (!score) {
      alert("별점평가를 해주세요.");
    } else if (!description) {
      alert("한줄평을 작성해주세요.");
    } else if (!img) {
      alert("사진을 등록해주세요.");
    }
  };

  const onChangeStarHandler = (newStar) => {
    setScore(newStar);
  };

  const onChangeTagHandler = (newTags) => {
    setTags(newTags);
  };

  // imgInfo가 바뀔 때(마다) 이미지 post 요청 실행
  useEffect(() => {
    const formData = new FormData();
    formData.append("images", imgInfo);
    console.log(formData);
    let token = localStorage.getItem("access_token");
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    axios
      .post(`${process.env.REACT_APP_API}/images/upload`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setImg(res.data.id);
        alert("사진추가 완료");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [imgInfo]);

  // input 사진 첨부 onchange 핸들러
  const uploadImg = (e) => {
    e.preventDefault();
    setImgInfo(e.target.files[0]);

    // 이미지 미리보기
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <MainContainer>
      <FormContainer onSubmit={onSubmitHandler}>
        <TitleContainer>
          <span>카페명</span>
          <span>{cafe_name}</span>
        </TitleContainer>
        <TagContainer>
          <TagTitle>
            <span>태그</span>
          </TagTitle>
          <TagBox>
            <NewTagForm value={tags} onChange={onChangeTagHandler} />
          </TagBox>
        </TagContainer>
        <StarContainer>
          <StarTitle>
            <span>별점</span>
          </StarTitle>
          <StarBox>
            <StarRating onChange={onChangeStarHandler} />
          </StarBox>
        </StarContainer>
        <TextContainer>
          <TextTitle>
            <span>한줄평</span>
          </TextTitle>
          <textarea
            name="content"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`${originReview.description}`}
          />
        </TextContainer>
        <BtnContainer>
          <Button>리뷰수정</Button>
        </BtnContainer>
      </FormContainer>
      <ImgContainer>
        <form encType="multipart/form-data">
          <ImgTitle>
            <span>사진</span>
          </ImgTitle>
          <p>카페에 대한 새로운 사진을 첨부해주세요. (최대 한장)</p>
          <div className="preview">
            {imgInfo && <img src={imgSrc} alt="이미지 미리보기" />}
          </div>
          <input
            type="file"
            accept="image/*"
            // ref={imgRef}
            onChange={uploadImg}
          />
          <button>이미지 등록하기</button>
        </form>
      </ImgContainer>
    </MainContainer>
  );
};

export default ReviewForm;

const MainContainer = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  width: 1360px;
  height: 1360px;
  margin-bottom: 150px;
  border-radius: 4px;
  border: 1px solid var(--gray-030);
  padding: 70px 80px;
`;

const FormContainer = styled.form`
  width: 90%;
  height: 600px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 65px;
  margin-bottom: 20px;
  span:first-child {
    width: 90px;
    font-size: 23px;
    font-weight: 700;
  }
  span:nth-child(2) {
    width: 490px;
    color: var(--green-010);
    font-size: 21px;
    font-weight: 700;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 30px;
  p {
    width: 600px;
    margin-top: 20px;
    color: var(--gray-020);
    font-size: 19px;
  }
  form {
    width: 600px;
    .preview {
      margin: 20px 0;
      width: 450px;
      height: 450px;
      background-color: var(--gray-030);
      img {
        width: 450px;
        height: 450px;
      }
    }
  }
`;

const ImgTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 600px;
  height: 10px;
  span {
    position: absolute;
    left: 0;
    font-size: 23px;
    font-weight: 700;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 110px;
  margin: 30px 0 0 10px;
`;

const TagTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 600px;
  height: 40px;
  span {
    position: absolute;
    left: 0;
    font-size: 23px;
    font-weight: 700;
  }
`;

const TagBox = styled.div`
  width: 600px;
  height: 110px;
  margin-top: 20px;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 110px;
  margin: 30px 0 0 10px;
`;

const StarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 600px;
  height: 20px;
  margin-top: 10px;
  span {
    position: absolute;
    left: 0;
    font-size: 23px;
    font-weight: 700;
  }
`;
const StarBox = styled.div`
  margin-top: 10px;
  width: 600px;
  height: 70px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 190px;
  margin-top: 50px;

  textarea {
    border: none;
    background-color: var(--white-010);
    border: 1px solid var(--green-010);
    border-radius: 8px;
    width: 800px;
    height: 100px;
    font-size: 20px;
    padding: 10px;
    margin-top: 10px;
  }
  textarea:focus {
    outline: none;
  }
`;

const TextTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 800px;
  height: 40px;
  span {
    position: absolute;
    left: 0;
    font-size: 23px;
    font-weight: 700;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1100px;
  margin: 450px 0 0 560px;
`;
