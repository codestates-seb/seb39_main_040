import React, { useState, useEffect, useRef } from "react";
import CafeCard from "./CafeCard";
import styled from "styled-components";
import axios from "axios";
import Loading from "../common/Loading";

const CafeCards = ({ searchInput, targetFilter }) => {
  const [cafeInfo, setCafeInfo] = useState([]);
  const [page, setPage] = useState(0);
  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { searchInput } = useStore();

  const searchGet = async (param) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/cafe/search?keyword=${param}`
    );
    // console.log(response.data.data);
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
  };

  // 카페 전체 리스트 불러오기
  const CafeGet = async () => {
    // 로딩상태를 true로 변경해준다.
    setIsLoading(true);
    // 로딩 스피너를 약 3초간 보여준다.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await axios
      .get(`${process.env.REACT_APP_API}/cafe/?page=${page}`)
      .then((res) => {
        setCafeInfo(cafeInfo.concat(res.data.data));
        setIsLoading(false);
      })
      .catch((e) => console.log("error:", e));
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);
        console.log(page);

        // 현재 타켓 observe
        observer.observe(entry.target);
      }
    });
  };

  useEffect(() => {
    CafeGet();
  }, [page]);

  const options = {
    rootMargin: "30px",
    threshold: 0.7,
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, options);
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(배열의 마지막 아이템)으로 지정
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    searchGet(searchInput);
  }, [searchInput]);

  useEffect(() => {
    filterGet(targetFilter);
  }, [targetFilter]);

  return (
    <MainWrapper>
      <CafeCardWrapper>
        {cafeInfo.map((el) => (
          <div id="observer">
            <CafeCard
              key={el.id}
              id={el.id}
              title={el.name}
              tags={el.tags}
              image={el.main_img}
            />
          </div>
        ))}
        <LoadingWrapper>{isLoading ? <Loading /> : null}</LoadingWrapper>
      </CafeCardWrapper>
      <div ref={target}></div>
    </MainWrapper>
  );
};

export default CafeCards;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const CafeCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  div {
    width: 300px;
    margin-right: 50px;
  }
`;
const LoadingWrapper = styled.div`
  width: 100%;
`;
