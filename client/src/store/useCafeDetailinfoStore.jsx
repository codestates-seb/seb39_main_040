import create from "zustand";
import axios from "axios";

const useCafeDetailinfoStore = create((set) => ({
  cafeIdInfo: [],
  fetch: async (url) => {
    const res = await axios.get(url);
    console.log("res", res);
    set({ cafeIdInfo: await res.data });
  },
}));

export default useCafeDetailinfoStore;
