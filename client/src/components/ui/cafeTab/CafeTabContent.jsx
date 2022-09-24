import CafeDetailTab from "../../cafe/cafeDetailTab/CafeDetailTab";
import CafeReviewsTab from "../../cafe/cafeDetailTab/CafeReviewsTab";
import CafeImagesTab from "../../cafe/cafeDetailTab/CafeImagesTab";
const CafeTabContent = ({ clickedTab, cafeIdInfo }) => {
  // console.log(cafeIdInfo);
  if (clickedTab === 0) {
    return <CafeDetailTab cafeIdInfo={cafeIdInfo} />;
  } else if (clickedTab === 1) {
    return <CafeReviewsTab />;
  } else if (clickedTab === 2) {
    return <CafeImagesTab cafeIdInfo={cafeIdInfo} />;
  }
};

export default CafeTabContent;
