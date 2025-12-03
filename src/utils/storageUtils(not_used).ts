// Файл-хелпер для работы с localStorage
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { RootState } from "../store";


// Загружаем состояние из localStorage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  if (typeof window === "undefined") return undefined;
  try {
    const serializedState = localStorage.getItem(STORAGE_KEYS.LAST_SEARCH);
    return serializedState
      ? { search: JSON.parse(serializedState) as RootState }
      : undefined;
  } catch (err) {
    console.error("Ошибка при загрузке состояния из localStorage", err);
    return undefined;
  }
};

// Сохраняем состояние в localStorage
export function saveState(state: RootState) {
  if (typeof window === "undefined") return;
  try {
    const serializedState = JSON.stringify(state.search);
    localStorage.setItem(STORAGE_KEYS.LAST_SEARCH, serializedState);
  } catch (err) {
    console.error("Ошибка при сохранении состояния в localStorage", err);
  }
}
