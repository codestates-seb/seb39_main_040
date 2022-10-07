import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const ReviewStarRating = ({ onChange }) => {
  const [value, setValue] = React.useState(3);

  return (
    <StarWrapper>
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Typography className="text" component="legend">
          이 카페는 어땠나요?
        </Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
          className="star"
        />
      </Box>
    </StarWrapper>
  );
};

export default ReviewStarRating;

const StarWrapper = styled.div`
  .text {
    font-size: 20px;
  }
  .star {
    margin-top: 10px;
    font-size: 38px;
    color: var(--green-010);
  }
`;
