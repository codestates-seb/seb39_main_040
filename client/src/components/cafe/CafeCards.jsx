import CafeCard from "./CafeCard";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const CafeCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1500px;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  div {
    width: 300px;
    margin-right: 50px;
  }
`;

const CafeCards = () => {
  const [cafeInfo, setCafeInfo] = useState([]);

  // 카페 전체 리스트 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cafe`)
      .then((res) => {
        console.log(res.data.data);
        setCafeInfo(res.data.data);
      })
      .catch((e) => console.log("error:", e));
  }, []);

  return (
    <CafeCardWrapper>
      {cafeInfo.map((el) => (
        <div>
          <CafeCard
            key={el.id}
            id={el.id}
            title={el.name}
            tags={el.tags}
            image={el.main_img}
          />
        </div>
      ))}
    </CafeCardWrapper>
  );
};

export default CafeCards;
