import create from "zustand";
import axios from "axios";

const useCafe = create((set) => ({
  // cafeInfo: [], //state
  // //state를 변경 시킴
  // setCafeInfo: async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API}/cafe`);
  //   set({ cafeInfo: res.data });
  //   console.log(res.data);
  // },

  cafeInfo: [],
  fetch: async (url) => {
    const res = await axios.get(url);
    // console.log("res", res.data.data);
    set({ cafeInfo: await res.data.data });
  },
}));

export default useCafe;
