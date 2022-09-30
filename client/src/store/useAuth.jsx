import axios from "axios";
import create from "zustand";
import instance from "../api/core";

const useAuthStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),

  token: sessionStorage.getItem("access_token"),

  userInfo: [],
  setUserInfo: async () => {
    // let token = sessionStorage.getItem("access_token") || "";
    // axios.defaults.headers.common["AccessToken"] = `${token}`;
    // const response = await axios
    //   .get(`${process.env.REACT_APP_API}/users/information`)
    //   .then((res) => {
    //     set({ userInfo: res.data });
    //   })
    //   .catch((err) => console.log(err));
    // const response = await core
    //   .get(`${process.env.REACT_APP_API}/users/information`)
    //   .then((res) => {
    //     set({ userInfo: res.data });
    //   });
    const response = await instance.get(`/users/information`);
    set({ userInfo: response });
  },
}));

export default useAuthStore;
