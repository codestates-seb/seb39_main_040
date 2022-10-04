import React from "react";

import MiddleTitle from "../../components/common/MiddleTitle";
import Header from "../../components/common/Header";
import UserWishCards from "../../components/mypage/UserWishCards";

const UserWishPage = () => {
  return (
    <>
      <Header />
      <MiddleTitle>찜한카페</MiddleTitle>
      <UserWishCards />
    </>
  );
};

export default UserWishPage;
