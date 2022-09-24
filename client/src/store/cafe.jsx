import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  cafeInfo: "", //state
  //state를 변경 시킴
  setCafeInfo: async (url) => {
    const res = await axios.get(url);
    set({ cafe: await res.data });
  },
}));

export default useStore;
