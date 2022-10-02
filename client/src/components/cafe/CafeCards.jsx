import React, { useState, useEffect } from "react";
import CafeCard from "./CafeCard";
import styled from "styled-components";
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

const CafeCards = ({ searchInput, targetFilter }) => {
  const [cafeInfo, setCafeInfo] = useState([]);
  // const { searchInput } = useStore();

  const searchGet = async (param) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/cafe/search?keyword=${param}`
    );
    console.log(response.data.data);
    setCafeInfo(response.data.data);
  };

  const filterGet = async (targetId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/cafe?category=${targetId}`
    );
    // console.log(response.data.data);
    setCafeInfo(response.data.data);
    if (response.data.data.length === 0) {
      alert("해당하는 카페가 없습니다.");
    }
    // console.log(targetId, response.data.data);
  };

  // 카페 전체 리스트 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cafe`)
      .then((res) => {
        setCafeInfo(res.data.data);
      })
      .catch((e) => console.log("error:", e));

    if (searchInput) {
      // console.log(searchInput);
      axios
        .get(`${process.env.REACT_APP_API}/cafe/search?name=${searchInput}`)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }

    // if (targetFilter) {
    //   // console.log(targetFilter);
    //   axios
    //     .get(`${process.env.REACT_APP_API}/cafe?category=${targetFilter}`)
    //     .then((res) => {
    //       console.log(res.data.data);
    //       if (res.data.data.length === 0) {
    //         alert("해당하는 카페가 없습니다.");
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }
  }, []);

  useEffect(() => {
    searchGet(searchInput);
  }, [searchInput]);

  useEffect(() => {
    filterGet(targetFilter);
    // console.log(targetFilter);
  }, [targetFilter]);

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
