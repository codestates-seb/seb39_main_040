import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
// 메인페이지, 마이페이지, 상세페이지, 리뷰 작성페이지, 리뷰 수정페이지, 지역페이지, 로그인페이지, 회원가입페이지, 아이디찾기페이지, 비밀번호찾기페이지
import CafeInfoPage from "./pages/CafeDetail/CafeInfoPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NewReviewPage from "./pages/Review/NewReviewPage";
import EditReviewPage from "./pages/Review/EditReviewPage";
import UserInfoPage from "./pages/User/UserInfoPage";
import UserInfoEditPage from "./pages/User/UserInfoEditPage";

function App() {
  const [cafeInfo, setCafeInfo] = useState("");

  // 카페 정보 불러오기
  useEffect(() => {
    axios
      .get("http://175.125.6.189/cafe")
      .then((res) => {
        // console.log(res.data.data);
        setCafeInfo(res.data.data);
      })
      .catch((e) => console.log("error:", e));
  }, []);

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage cafeInfo={cafeInfo} />} />
          <Route
            path="/cafe/:id"
            element={<CafeInfoPage cafeInfo={cafeInfo} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cafe/:id/reviews" element={<NewReviewPage />} />
          <Route path="/editreview" element={<EditReviewPage />} />
          <Route path="/userinfo" element={<UserInfoPage />} />
          <Route path="/userinfoedit" element={<UserInfoEditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
