import MypageInfoTab from "../../Mypage/myPageDetailTab/MyPageInfoTab";
import MyPageWishTab from "../../Mypage/myPageDetailTab/MyPageWishTab";
import MyPageReviewTab from "../../Mypage/myPageDetailTab/MyPageReviewTab";

const MyPageTabContent = ({ clickedTab }) => {
  if (clickedTab === 0) {
    return <MypageInfoTab />;
  } else if (clickedTab === 1) {
    return <MyPageWishTab />;
  } else if (clickedTab === 2) {
    return <MyPageReviewTab />;
  }
};

export default MyPageTabContent;
