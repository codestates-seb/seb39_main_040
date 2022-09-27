import * as React from "react";
import CafeReviewCards from "../cafe/CafePageBottomSection/CafeReviews/CafeReviewCards";
import CafeMenu from "../cafe/CafePageBottomSection/CafeMenu";
import CafePhotoCards from "../cafe/CafePageBottomSection/CafePhotos/CafePhotoCards";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
function TabBarPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabBarPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: var(--green-010);
    font-weight: 800;
    font-size: 16px;
  }
  .css-1aquho2-MuiTabs-indicator {
    background-color: var(--green-010);
  }
`;

const TabContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabWrapper>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="리뷰" {...a11yProps(0)} />
            {/* label={`리뷰(${review.length})`} */}
            <Tab label="메뉴" {...a11yProps(1)} />
            <Tab label="사진" {...a11yProps(2)} />
          </Tabs>
        </TabWrapper>
      </Box>
      <TabContentWrapper>
        <TabBarPanel value={value} index={0}>
          <CafeReviewCards />
        </TabBarPanel>
        <TabBarPanel value={value} index={1}>
          <CafeMenu />
        </TabBarPanel>
        <TabBarPanel value={value} index={2}>
          <CafePhotoCards />
        </TabBarPanel>
      </TabContentWrapper>
    </Box>
  );
};

export default TabBar;
