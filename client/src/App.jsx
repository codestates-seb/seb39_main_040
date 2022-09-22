import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 메인페이지, 마이페이지, 상세페이지, 리뷰 작성페이지, 리뷰 수정페이지, 지역페이지, 로그인페이지, 회원가입페이지, 아이디찾기페이지, 비밀번호찾기페이지
import Header from "./components/ui/Header";

import CafePage from "./pages/CafePage";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NewReviewPage from "./pages/NewReviewPage";
import EditReviewPage from "./pages/EditReviewPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cafe" element={<CafePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/newreview" element={<NewReviewPage />} />
          <Route path="/editreview" element={<EditReviewPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
