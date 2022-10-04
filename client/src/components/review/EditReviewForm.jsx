import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "../common/Button";
import NewTagForm from "./ReviewTag";
import StarRating from "./ReviewStarRating";
import Swal from "sweetalert2";

const ReviewForm = ({ cafeId, reviewId, cafe_name, originReview }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState();
  const [score, setScore] = useState(0);
  const [tags, setTags] = useState();
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
          Swal.fire({
            title: "리뷰가 수정되었습니다.",
            text: "수정된 리뷰를 확인해보세요.",
            confirmButtonColor: "var(--green-010)",
            icon: "success",
          });
          navigate(`/user/review`);
        })
        .catch((err) => {
          console.log("err", err);
          if (err.response.status === 412 || 400) {
            Swal.fire({
              title: "다시 시도해주세요",
              text: "리뷰가 정상적으로 수정되지 않았습니다.",
              confirmButtonColor: "var(--green-010)",
              icon: "error",
            });
          }
        });
    } else if (!tags) {
      Swal.fire({
        title: "태그를 두개 이상 선택해주세요.",
        confirmButtonColor: "var(--green-010)",
        icon: "error",
      });
    } else if (!score) {
      Swal.fire({
        title: "별점을 선택해주세요.",
        confirmButtonColor: "var(--green-010)",
        icon: "error",
      });
    } else if (!description) {
      Swal.fire({
        title: "한줄평을 작성해주세요.",
        confirmButtonColor: "var(--green-010)",
        icon: "error",
      });
    } else if (!img) {
      Swal.fire({
        title: "사진을 등록해주세요.",
        confirmButtonColor: "var(--green-010)",
        icon: "error",
      });
    }
  };

  const onChangeStarHandler = (newStar) => {
    setScore(newStar);
  };

  const onChangeTagHandler = (newTags) => {
    setTags(newTags);
  };

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
        Swal.fire({
          title: "사진이 추가되었습니다.",
          text: "추가된 사진을 확인해보세요.",
          confirmButtonColor: "var(--green-010)",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [imgInfo]);

  const uploadImg = (e) => {
    e.preventDefault();
    setImgInfo(e.target.files[0]);

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
            <p>태그를 두개 이상 선택해 주세요. </p>
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
          <ImgUpdateButton>
            사진 추가
            <input type="file" accept="image/*" onChange={uploadImg} />
          </ImgUpdateButton>
        </form>
      </ImgContainer>
    </MainContainer>
  );
};

export default ReviewForm;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1360px;
  height: 1560px;
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
  align-items: center;
  justify-content: center;
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

const ImgUpdateButton = styled.label`
  background: none;
  cursor: pointer;
  margin-top: 25px;
  border: 1px solid var(--green-010);
  border-radius: 5px;
  color: var(--green-010);
  font-weight: 600;
  padding: 10px 194px;

  :hover {
    background: var(--green-010);
    color: var(--white-010);
  }

  > input {
    margin-top: 10px;
    font-weight: 600;
    font-size: 1.2rem;
    text-align: center;
    display: none;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 110px;
  margin: 40px 0 0 10px;
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
  p {
    width: 600px;
    margin: 10px 0 20px 0;
    color: var(--gray-020);
    font-size: 19px;
  }
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 110px;
  margin: 40px 0 0 10px;
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
  margin: 650px 0 0 560px;
`;
