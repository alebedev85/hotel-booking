import { loadState, saveState } from "@/utils/storageUtils";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import searchReducer from "./searchSlice";
import themeReducer from "./themeSlice";

// Загружаем сохранённое состояние
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    search: searchReducer,
    theme: themeReducer
  },
  preloadedState: preloadedState
    ? {
        search: preloadedState.search,
      }
    : undefined, // инициализация store из localStorage
});

// Подписываемся на изменения store и сохраняем их

store.subscribe(() => {
  saveState(store.getState());
});

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//хуки
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
