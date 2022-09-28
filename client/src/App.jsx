import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/cafe/:id" element={<CafeDetailPage />} />
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
