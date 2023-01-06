import styled from "styled-components";
import React from "react";

const ImageModal = ({ setModalOpen, image }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={closeModal}>
        <ModalView>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <ImgContainer>
            <ReviewImg src={`${image}`} alt="리뷰이미지" />
          </ImgContainer>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default ImageModal;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const ModalView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.01);
`;

const CloseButton = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 40px;
  margin-left: 650px;
  margin-bottom: 20px;
  color: white;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 700px;
`;

const ReviewImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 700px;
`;
