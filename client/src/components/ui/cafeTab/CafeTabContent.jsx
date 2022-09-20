import styled from "styled-components";
import CafeDetailTab from "../../cafe/cafeDetailTab/CafeDetailTab";
import CafeReviewsTab from "../../cafe/cafeDetailTab/CafeReviewsTab";
import CafeImagesTab from "../../cafe/cafeDetailTab/CafeImagesTab";
const CafeTabContent = ({ clickedTab }) => {
  if (clickedTab === 0) {
    return <CafeDetailTab />;
  } else if (clickedTab === 1) {
    return <CafeReviewsTab />;
  } else if (clickedTab === 2) {
    return <CafeImagesTab />;
  }
};

export default CafeTabContent;
