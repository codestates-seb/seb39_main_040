import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const defaultTags = [
  { tag: "조용한" },
  { tag: "디저트맛집" },
  { tag: "커피맛집" },
  { tag: "스터디" },
  { tag: "포토존" },
  { tag: "분위기좋은" },
  { tag: "브런치맛집" },
  { tag: "친절해요" },
  { tag: "뷰맛집" },
  { tag: "인스타감성" },
  { tag: "아늑한" },
  { tag: "반려동물출입가능" },
  { tag: "힙한" },
];

const ReviewTag = ({ onChange }) => {
  const [selectedTag, setSelectedTag] = useState();
  const onChangeHandler = (tag) => {
    let newArr = [];

    for (let i = 0; i < tag.length; i++) {
      let value = Object.values(tag[i]);
      newArr.push(...value);
    }
    setSelectedTag(newArr);
    onChange(selectedTag);
    return newArr;
  };

  return (
    <div>
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={defaultTags}
        getOptionLabel={(option) => option.tag}
        renderInput={(params) => (
          <TextField {...params} placeholder="태그를 선택하세요." />
        )}
        onChange={(event, value) => onChangeHandler(value)}
        sx={{ width: "600px" }}
      />
    </div>
  );
};

export default ReviewTag;
