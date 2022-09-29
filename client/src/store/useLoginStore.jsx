import create from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: () => {
        set((state) => ({ isLogin: !state.isLogin }));
      },
    }),
    { name: "isLogin" }
  )
);

export default useLoginStore;
