// Файл-хелпер для работы с localStorage

import { RootState } from "../store";

const SEARCH_KEY = "lastSearch";

// Загружаем состояние из localStorage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem(SEARCH_KEY);
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
  try {
    const serializedState = JSON.stringify(state.search);
    localStorage.setItem(SEARCH_KEY, serializedState);
  } catch (err) {
    console.error("Ошибка при сохранении состояния в localStorage", err);
  }
}
