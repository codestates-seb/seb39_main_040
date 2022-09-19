import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 메인페이지, 마이페이지, 상세페이지, 리뷰 작성페이지, 리뷰 수정페이지, 지역페이지, 로그인페이지, 회원가입페이지, 아이디찾기페이지, 비밀번호찾기페이지

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        {/* <Routes>
          <Route path="/"></Route>

        </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
