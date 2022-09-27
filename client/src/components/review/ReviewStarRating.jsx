import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const ReviewStarRating = ({ onChange }) => {
  const [value, setValue] = React.useState(3);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Typography component="legend">이 카페는 어땠나요?</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          onChange(newValue);
        }}
      />
    </Box>
  );
};

export default ReviewStarRating;
