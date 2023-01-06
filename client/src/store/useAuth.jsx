import create from "zustand";
import instance from "../api/core";

const useAuthStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),

  token: sessionStorage.getItem("access_token"),

  userInfo: [],
  setUserInfo: async () => {
    const response = await instance.get(
      `${process.env.REACT_APP_API}/users/information`
    );
    set({ userInfo: response });
  },
}));

export default useAuthStore;
