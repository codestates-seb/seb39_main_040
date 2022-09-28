import MypageInfoTab from "../../mypage/myPageDetailTab/MyPageInfoTab";
import MyPageWishTab from "../../mypage/myPageDetailTab/MyPageWishTab";
import MyPageReviewTab from "../../mypage/myPageDetailTab/MyPageReviewTab";

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
