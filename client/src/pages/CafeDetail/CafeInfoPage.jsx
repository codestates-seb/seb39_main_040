import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import CafeInfo from "../../components/Cafe/CafeInfo";
import CafeTab from "../../components/ui/cafeTab/CafeTab";

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
`;

const CafeInfoPage = () => {
  const { id } = useParams();
  const [cafeIdInfo, setCafeIdInfo] = useState("");

  useEffect(() => {
    axios
      .get(`http://175.125.6.189/cafe/${id}`)
      .then((res) => {
        setCafeIdInfo(res.data);
      })
      .catch((err) => console.err("error:", err));
  }, []);

  return (
    <MainWrapper>
      <CafeInfo cafeIdInfo={cafeIdInfo} />
      <CafeTab cafeIdInfo={cafeIdInfo} />
    </MainWrapper>
  );
};

export default CafeInfoPage;
