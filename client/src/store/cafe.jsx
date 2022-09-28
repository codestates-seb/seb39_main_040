import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  cafeInfo: [], //state
  //state를 변경 시킴
  setCafeInfo: async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/cafe`);
    set({ cafeInfo: res.data });
    console.log(res.data);
  },
}));

export default useStore;
