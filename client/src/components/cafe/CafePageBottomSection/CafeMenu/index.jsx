import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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
  margin-top: 30px;
  img {
    width: 500px;
    height: 600px;
  }
`;

const CafeMenu = ({ menuImg }) => {
  return (
    <MenuWrapper>
      <TextBox>
        <FontAwesomeIcon className="icon" icon={faCircleInfo} />
        <span>메뉴를 확인해보세요.</span>
      </TextBox>
      <ImgBox>
        <img src={`${menuImg}`} alt="너비가 긴 메뉴이미지" />
      </ImgBox>
    </MenuWrapper>
  );
};

export default CafeMenu;
