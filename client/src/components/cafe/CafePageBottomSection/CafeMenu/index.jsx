import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 1520px;
`;

const TextBox = styled.div`
  display: flex;
  .icon {
    margin: 2px 5px 0 0;
    color: var(--gray-020);
  }

  span {
    color: var(--black-010);
    font-size: 14px;
  }
`;

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 600px;
  img {
    width: auto;
    height: auto;
  }
`;

const CafeMenu = () => {
  return (
    <MenuWrapper>
      <TextBox>
        <FontAwesomeIcon className="icon" icon={faCircleInfo} />
        <span>메뉴를 확인해보세요.</span>
      </TextBox>
      <ImgBox>
        {/* <img
          src="https://file.miricanvas.com/template_thumb/2021/06/28/16/40/kh6m4tls8qin433p/thumb.jpg"
          alt="높이가 긴 메뉴이미지"
        /> */}
        <img
          src="https://file.miricanvas.com/template_thumb/2021/05/20/16/00/kedgej4vde8gl9ji/thumb.jpg"
          alt="너비가 긴 메뉴이미지"
        />
      </ImgBox>
    </MenuWrapper>
  );
};

export default CafeMenu;
