// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage по умолчанию
import searchReducer from "./searchSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";

// Конфиг для redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["search", "theme"], // сохраняем только search (можно добавить theme, auth если нужно)
};

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  search: searchReducer,
  theme: themeReducer,
  auth: authReducer,
});

// Оборачиваем в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Нужно для корректной работы redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Создаем persistor
export const persistor = persistStore(store);

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
