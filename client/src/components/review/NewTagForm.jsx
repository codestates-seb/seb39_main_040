import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const defaultTags = [
  { tag: "#조용한" },
  { tag: "#디저트맛집" },
  { tag: "#커피맛집" },
  { tag: "#스터디" },
  { tag: "#포토존" },
  { tag: "#분위기좋은" },
  { tag: "#브런치맛집" },
  { tag: "#친절해요" },
  { tag: "#뷰맛집" },
  { tag: "#인스타감성" },
  { tag: "#아늑한" },
  { tag: "#반려동물출입가능" },
  { tag: "#힙한" },
];

const NewTagForm = () => {
  return (
    <div>
      <Autocomplete
        multiple
        limitTags={3}
        id="multiple-limit-tags"
        options={defaultTags}
        getOptionLabel={(option) => option.tag}
        defaultValue={[defaultTags[0], defaultTags[1]]}
        renderInput={(params) => (
          <TextField {...params} placeholder="태그를 선택하세요." />
        )}
        sx={{ width: "600px" }}
      />
    </div>
  );
};

export default NewTagForm;
