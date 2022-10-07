import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Tag from "../../common/Tag";
import CafeInfoMap from "./CafeInfoMap";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhone,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import ManagerBadge from "../../../assets/badge.svg";

const CafePageTopSection = ({ cafeIdInfo, tags }) => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin");

  const addWishHandler = () => {
    if (!localStorage.getItem("access_token")) {
      Swal.fire({
        title: "로그인 후 이용할 수 있습니다.",
        text: "로그인 하시겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "var(--green-010)",
        cancelButtonColor: "var(--red-010)",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
    if (isLogin) {
      Swal.fire({
        title: "위시리스트에 추가하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "var(--green-010)",
        cancelButtonColor: "var(--red-010)",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then(() => {
        let token = localStorage.getItem("access_token") || "";
        axios.defaults.headers.common["AccessToken"] = `${token}`;
        axios
          .post(
            `${process.env.REACT_APP_API}/users/wishlist/${cafeIdInfo.id}`,
            {
              headers: { AccessToken: localStorage.getItem("access_token") },
            }
          )
          .then(() => {
            Swal.fire({
              title: "위시리스트에 추가되었습니다.",
              icon: "success",
              confirmButtonColor: "var(--green-010)",
            });
          })
          .catch((err) => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "이미 위시리스트에 등록된 카페입니다.",
                icon: "warning",
                confirmButtonColor: "var(--green-010)",
              });
            } else {
              Swal.fire({
                title: "위시리스트 등록에 실패했습니다.",
                text: "다시 시도해주세요",
                icon: "error",
                confirmButtonColor: "var(--green-010)",
              });
            }
          });
      });
    }
  };

  return (
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
                <button onClick={addWishHandler}>
                  <FontAwesomeIcon className="icon" icon={faHeart} />
                </button>
                <span className="tooltip-text">위시리스트 추가하기</span>
              </ToolTip>
              <Badge>
                {cafeIdInfo.badge === true ? (
                  <span>
                    <img src={ManagerBadge} alt="관리자뱃지" />
                  </span>
                ) : (
                  <></>
                )}
              </Badge>
            </TitleBox>
            <Tagbox>
              {tags && tags.map((el) => <Tag className="tag-item">#{el}</Tag>)}
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
                <li>{cafeIdInfo.phone}</li>
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faSquareInstagram} />
                <a href={cafeIdInfo.homepage}>_{cafeIdInfo.name}_</a>
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
                <li>{cafeIdInfo.address}</li>
              </div>
            </CafeInfoBox>
            <CafeMapbox>
              <CafeInfoMap place={cafeIdInfo.address} />
            </CafeMapbox>
          </CafedetailContent>
        </Cafedetail>
      </CafeTopInfo>
    </CafeTopSection>
  );
};

export default CafePageTopSection;

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
  width: 550px;
  height: 500px;
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
  }
  button:hover {
    color: var(--green-020);
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

const Badge = styled.div`
  margin-left: 10px;
  img {
    width: 100px;
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
  .tag-item {
    margin-right: 5px;
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
    a {
      text-decoration: none;
      color: var(--black-010);
      font-weight: 500;
    }
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
