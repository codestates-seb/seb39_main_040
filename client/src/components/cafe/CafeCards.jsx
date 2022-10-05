import React, { useState, useEffect, useRef } from "react";
import CafeCard from "./CafeCard";
import styled from "styled-components";
import axios from "axios";
import Loading from "../common/Loading";
import Swal from "sweetalert2";

const CafeCards = ({ searchInput, targetFilter }) => {
  const [cafeInfo, setCafeInfo] = useState([]);
  const [page, setPage] = useState(1);
  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [throttle, setThrottle] = useState(false);

  const searchGet = async (param) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/cafe/search?keyword=${param}`
    );
    setCafeInfo(response.data.data);
    if (response.data.data.length === 0) {
      Swal.fire({
        title: "해당하는 카페가 없습니다.",
        confirmButtonColor: "var(--green-010)",
        icon: "error",
      });
    }
  };

  const filterGet = async (targetId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/cafe?category=${targetId}`
    );
    setCafeInfo(response.data.data);
    if (response.data.data.length === 0) {
      Swal.fire({
        title: "해당하는 카페가 없습니다.",
        confirmButtonColor: "var(--green-010)",
        icon: "error",
      });
    }
  };

  const CafeGet = async () => {
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
        if (!throttle) {
          setThrottle(true);
          setTimeout(async () => {
            setPage((page) => page + 1);
            observer.observe(entry.target);
            setThrottle(false);
          }, 300);
        }
      }
    });
  };

  useEffect(() => {
    CafeGet();
  }, [page]);

  const options = {
    rootMargin: "30px",
    threshold: 0.3,
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, options);
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchGet(searchInput);
    }, 400);
    return () => clearTimeout(debounce);
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
              text={el.description}
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
  height: 1000px;
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
