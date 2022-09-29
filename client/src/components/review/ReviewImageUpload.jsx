import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 510px;
  .imgUpload {
    /* display: none; */
  }
`;

const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: var(--gray-030);
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    color: var(--gray-020);
  }
  img {
    width: 400px;
    height: 400px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin-top: 20px;
  button {
    font-size: 18px;
    width: 400px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid var(--green-010);
    background-color: var(--white-010);
    color: var(--green-010);
    cursor: pointer;
  }
  button:hover {
    background-color: var(--green-010);
    color: var(--white-010);
  }
`;

const ReviewImageUpload = ({ onChange }) => {
  const [imgFiles, setImgFiles] = useState("");

  // const imgInput = useRef();

  // const onSubmitImg = (e) => {
  //   e.preventDefault();
  //   imgInput.current.click();
  // };

  // const onImgChange = (fileBlob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileBlob);
  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setFiles(reader.result);
  //       resolve();
  //     };
  //   });
  // };

  return (
    <MainWrapper>
      {/* <ImgContainer>
        {files ? (
          <img src={files} alt="이미지 미리보기" />
        ) : (
          <FontAwesomeIcon className="icon" icon={faImage} size="3x" />
        )}
      </ImgContainer>
      <input
        type="file"
        ref={imgInput}
        accept="image/*"
        className="imgUpload"
        onChange={(e) => onImgChange(e.target.files[0])}
      />
      <BtnContainer>
        <button type="button" onClick={onSubmitImg}>
          사진 올리기
        </button>
      </BtnContainer> */}
      <input
        type="file"
        name="file"
        // ref={imgInput}
        accept="image/*"
        className="imgUpload"
        // onChange={(e) => onImgChange(e.target.files[0])}
      />
    </MainWrapper>
  );
};

export default ReviewImageUpload;
