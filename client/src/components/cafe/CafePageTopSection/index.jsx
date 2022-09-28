import Tag from "../../common/Tag";
import CafeInfoMap from "./CafeInfoMap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhone,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

const CafeTopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;
  margin-top: 10px;
`;

const CafeTopInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 1520px;
  /* border: 1px solid black; */
`;

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  margin-right: 35px;
  img {
    width: 450px;
    height: 500px;
  }
`;

const Cafedetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 450px;
  height: 500px;
  /* border: 1px solid black; */
`;
const CafedetailContent = styled.div`
  position: absolute;
  left: 0;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  p {
    font-size: 23px;
    font-weight: 600;
  }
`;

const ToolTip = styled.span`
  display: inline-block;
  cursor: pointer;
  button {
    margin-left: 5px;
    border: none;
    font-size: 25px;
    color: var(--green-010);
    cursor: pointer;
  }
  .tooltip-text {
    z-index: 100;
    display: none;
    position: absolute;
    max-width: 200px;
    box-shadow: rgba(149, 157, 165, 0.1) 0px 10px 10px;
    padding: 5px;
    font-size: 14px;
    color: var(--black-010);
    background: var(--gray-010);
  }
  :hover .tooltip-text {
    display: block;
  }
`;

const Tagbox = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  margin-bottom: 5px;
  span {
    font-size: 15px;
  }
`;

const CafeInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 168px;
  div {
    display: flex;
    align-items: center;
    height: 35px;
    font-size: 15px;
  }
  div:nth-child(1) {
    font-size: 16px;
  }

  div:nth-child(n + 1) {
    .icon {
      margin-right: 10px;
      color: var(--green-010);
    }
  }
`;

const CafeMapbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  margin: 20px 0 20px 0;
`;

const CafePageTopSection = ({ cafeIdInfo }) => {
  return (
    // <Wrapper>
    //   <div className="img-box">
    //     <img src={`${cafeIdInfo.main_img}`} alt="카페사진" />
    //   </div>
    //   <div className="title-box">
    //     <p>{cafeIdInfo.name}</p>
    //     <button>♥︎</button>
    //   </div>
    //   <div className="tag-box">
    //     <span>#{cafeIdInfo.tags}</span>
    //   </div>
    // </Wrapper>
    <CafeTopSection>
      <CafeTopInfo>
        <ImgBox>
          <img src={`${cafeIdInfo.main_img}`} alt="카페사진" />
        </ImgBox>
        <Cafedetail>
          <CafedetailContent>
            <TitleBox>
              <p>{cafeIdInfo.name}</p>
              <ToolTip>
                <button>
                  <FontAwesomeIcon className="icon" icon={faHeart} />
                </button>
                <span className="tooltip-text">위시리스트 추가하기</span>
              </ToolTip>
            </TitleBox>
            <Tagbox>
              <Tag>#{cafeIdInfo.tags}</Tag>
            </Tagbox>
            <CafeInfoBox>
              <div>
                <p>{cafeIdInfo.description}</p>
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faClock} />
                <li>{cafeIdInfo.running_time}</li>
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faPhone} />
                <li>0503-3445-8573</li>
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faSquareInstagram} />
                <li>cafe_Maison_ete</li>
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
                <li>{cafeIdInfo.address}</li>
              </div>
            </CafeInfoBox>
            <CafeMapbox>
              <CafeInfoMap address={cafeIdInfo.address} />
            </CafeMapbox>
          </CafedetailContent>
        </Cafedetail>
      </CafeTopInfo>
    </CafeTopSection>
  );
};

export default CafePageTopSection;
