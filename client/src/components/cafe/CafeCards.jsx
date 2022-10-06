import React, { useState, useEffect, useRef } from "react";
import CafeCard from "./CafeCard";
import styled from "styled-components";
import axios from "axios";
import Loading from "../common/Loading";
import Swal from "sweetalert2";

const CafeCards = ({ totalPage, searchInput, targetFilter }) => {
  const [cafeInfo, setCafeInfo] = useState([]);
  const [page, setPage] = useState(1);
  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

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
      }).then(() => {
        window.location.reload();
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
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const CafeGet = async (page) => {
    setIsLoading(true);
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
    const entry = entries[0];
    if (entry.isIntersecting && !isLoading) {
      setTimeout(async () => {
        setPage((page) => page + 1);
        // observer.observe(entry.target);
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (page !== 1 && totalPage >= page) {
      CafeGet(page);
    }
  }, [page]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1.0 });
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
      </CafeCardWrapper>
      <TargetWrapper>
        <div className="target" ref={target}>
          <LoadingWrapper>{isLoading ? <Loading /> : null}</LoadingWrapper>
        </div>
      </TargetWrapper>
    </MainWrapper>
  );
};

export default CafeCards;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  /* height: 1500px; */
  flex-wrap: wrap;
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

const TargetWrapper = styled.div`
  width: 100%;
`;
