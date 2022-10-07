import create from "zustand";
import axios from "axios";

const useCafe = create((set) => ({
  totalPage: "",
  fetch: async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/cafe`);
    set({ totalPage: res.data.pageInfo.total_page });
  },
}));

export default useCafe;
