import CafeDetailTab from "../../Cafe/cafeDetailTab/CafeDetailTab";
import CafeReviewsTab from "../../Cafe/cafeDetailTab/CafeReviewsTab";
import CafeImagesTab from "../../Cafe/cafeDetailTab/CafeImagesTab";

const CafeTabContent = ({ clickedTab, cafeIdInfo }) => {
  if (clickedTab === 0) {
    return <CafeDetailTab cafeIdInfo={cafeIdInfo} />;
  } else if (clickedTab === 1) {
    return <CafeReviewsTab />;
  } else if (clickedTab === 2) {
    return <CafeImagesTab cafeIdInfo={cafeIdInfo} />;
  }
};

export default CafeTabContent;
