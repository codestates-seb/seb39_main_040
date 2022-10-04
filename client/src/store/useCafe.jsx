import create from "zustand";
import axios from "axios";

const useCafe = create((set) => ({
  cafeInfo: [],
  fetch: async (url) => {
    const res = await axios.get(url);
    set({ cafeInfo: await res.data.data });
  },
}));

export default useCafe;
