import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import CafeDetailPage from "./pages/CafeDetail/CafeDetailPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NewReviewPage from "./pages/Review/NewReviewPage";
import EditReviewPage from "./pages/Review/EditReviewPage";
import UserInfoPage from "./pages/User/UserInfoPage";
import UserInfoEditPage from "./pages/User/UserInfoEditPage";
import UserReviewPage from "./pages/User/UserReviewPage";
import UserWishPage from "./pages/User/UserWishPage";

function App() {
  const [cafeInfo, setCafeInfo] = useState([]);

  // 카페 전체 리스트 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cafe`)
      .then((res) => {
        // console.log(res.data.data);
        setCafeInfo(res.data.data);
      })
      .catch((e) => console.log("error:", e));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage cafeInfo={cafeInfo} />} />

          <Route
            path="/cafe/:id"
            element={<CafeDetailPage cafeInfo={cafeInfo} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cafe/:id/reviews" element={<NewReviewPage />} />
          <Route path="/editreview" element={<EditReviewPage />} />
          <Route path="/userinfo" element={<UserInfoPage />} />
          <Route path="/userinfoedit" element={<UserInfoEditPage />} />
          <Route path="/user/review" element={<UserReviewPage />} />
          <Route path="/user/wish" element={<UserWishPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
