import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import CafeInfo from "../components/cafe/cafeDetailTab/CafeInfo";
import CafeTab from "../components/ui/cafeTab/CafeTab";

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
`;

const CafePage = () => {
  const { id } = useParams();
  const [cafeIdInfo, setCafeIdInfo] = useState(""); //카페정보state
  // const [cafeIdImage, setCafeIdImage] = useState(""); //사진정보state

  // 카페 정보 불러오기 (사진포함)
  useEffect(() => {
    axios
      .get(`http://175.125.6.189/cafe/${id}`)
      .then((res) => {
        // console.log(res.data);
        setCafeIdInfo(res.data);
      })
      .catch((err) => console.log("error:", err));
  }, []);

  // 사진 정보 불러오기
  // useEffect(() => {
  //   axios
  //     .get(`http://175.125.6.189/images/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setCafeIdImage(res.data);
  //     })
  //     .catch((err) => console.log("err:", err));
  // }, []);

  return (
    <MainWrapper>
      <CafeInfo cafeIdInfo={cafeIdInfo} />
      <CafeTab cafeIdInfo={cafeIdInfo} />
    </MainWrapper>
  );
};

export default CafePage;
