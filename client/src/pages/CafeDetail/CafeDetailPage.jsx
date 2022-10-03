import CafePageTopSection from "../../components/cafe/CafePageTopSection";
import TabBar from "../../components/common/TabBar";
import Header from "../../components/common/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

const CafeDetailPage = () => {
  const [cafeIdInfo, setCafeIdInfo] = useState([]);
  const [cafeImages, setCafeImages] = useState([]);
  const { id } = useParams();

  // 카페 상세 정보 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cafe/${id}`)
      .then((res) => {
        // console.log(res.data);
        setCafeIdInfo(res.data);
      })
      .catch((e) => console.err("error:", e));
  }, []);

  // 카페 사진 정보 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cafe/${id}/reviews/images`)
      .then((res) => {
        console.log(res.data);
        setCafeImages(res.data);
      })
      .catch((e) => console.err("error:", e));
  }, []);

  return (
    <>
      <Header />
      <CafePageTopSection cafeIdInfo={cafeIdInfo} />
      <TabBar cafeIdInfo={cafeIdInfo} cafeImages={cafeImages} />
    </>
  );
};

export default CafeDetailPage;
