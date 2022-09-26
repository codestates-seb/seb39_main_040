import CafeDetailMap from "../../map/CafeDetailMap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  .first-box {
    display: flex;
    justify-content: center;
    align-items: center;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 500px;
      height: 400px;

      p {
        position: absolute;
        top: 0;
        margin: 10px 0 20px 0;
      }

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        width: 300px;
        height: 260px;

        div {
          display: flex;
          align-items: center;
          justify-content: center;

          .icon {
            margin-right: 15px;
            color: #735757;
          }
        }
        li {
          line-height: 50px;
          font-size: 18px;
          width: 250px;
          height: 50px;
          margin: 7px 0;
          border-bottom: 1px solid #93857c;
        }
      }
    }

    .right {
      width: 500px;
      height: 400px;
      margin-left: 10px;
      border: 1px solid black;
    }
  }

  .second-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 40px;
    width: 500px;
    height: 700px;

    p {
      position: absolute;
      top: 0;
      margin-top: 10px;
    }

    .cafe-image {
      width: 450px;
      height: 600px;
      img {
        width: 450px;
        height: 600px;
      }
    }
  }
`;

const CafeDetailTab = ({ cafeIdInfo }) => {
  return (
    <MainWrapper>
      <div className="first-box">
        <div className="left">
          <p>{cafeIdInfo.description}</p>
          <ul>
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
          </ul>
        </div>

        <div className="right">
          <p>Location</p>
          <div>
            <CafeDetailMap />
          </div>
        </div>
      </div>

      <div className="second-box">
        <p>Menu</p>
        <div className="cafe-image">
          <img src={`${cafeIdInfo.menu_img}`} alt="카페메뉴사진" />
        </div>
      </div>
    </MainWrapper>
  );
};

export default CafeDetailTab;
