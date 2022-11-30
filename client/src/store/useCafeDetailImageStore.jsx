import create from "zustand";
import axios from "axios";

const useCafeDetailImageStore = create((set) => ({
  cafeImages: [],
  fetch: async (url) => {
    const res = await axios.get(url);
    console.log("res", res);
    set({ cafeImages: await res.data });
  },
}));

export default useCafeDetailImageStore;
