import styled from "styled-components";
import CafeDetailTab from "../cafe/CafeDetailTab"
import CafeReviewsTab from "../cafe/CafeReviewsTab";
import CafeImagesTab from "../cafe/CafeImagesTab";

const CafeTabContent = ({clickedTab}) => {
    if (clickedTab === 0) {
        return <CafeDetailTab />
    } else if ( clickedTab === 1) {
        return <CafeReviewsTab />
    } else if (clickedTab === 2) {
        return <CafeImagesTab />
    }
}

export default CafeTabContent;
