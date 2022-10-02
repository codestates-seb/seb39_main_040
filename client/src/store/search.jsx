import create from "zustand";

const useStore = create((set) => ({
  searchInput: "",

  setSearchInput: (input) => set(() => ({ input })),
}));

export default useStore;
