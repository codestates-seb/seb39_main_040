import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),

  userInfo: [],
  setUserInfo: async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_API}/users/information`, {
        headers: { AccessToken: sessionStorage.getItem("access_token") },
      })
      .then((res) => {
        console.log("유저데이터조회성공");
        set({ userInfo: res.data });
      })
      .catch((err) => console.log(err));
  },
}));

export default useAuthStore;
