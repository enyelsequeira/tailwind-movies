import { Categories } from "@/hooks/useGetHomePage";
import { create } from "zustand";

interface CategoryState {
  categories: Categories;
  setCategory: (category: Categories) => void;
}

const useCategoriesStore = create<CategoryState>((set) => ({
  categories: "popular",
  setCategory: (category: Categories) => set({ categories: category }),
  // const setPage: Dispatch<SetStateAction<number>>
}));

export default useCategoriesStore;

interface PaginationState {
  currentPage: number;
  totalPages: number;
  setPage: (pageUpdater: (currentPage: number) => number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  totalPages: 0,
  setPage: (pageUpdater: (currentPage: number) => number) =>
    set((state) => ({ ...state, currentPage: pageUpdater(state.currentPage) })),
}));
