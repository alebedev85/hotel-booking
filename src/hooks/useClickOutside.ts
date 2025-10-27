import { useEffect, RefObject } from "react";

/**
 * Хук, который вызывает callback при клике вне указанного элемента.
 * @param ref — ссылка на DOM-элемент, за пределами которого будет срабатывать callback.
 * @param onOutsideClick — функция, вызываемая при клике вне элемента.
 * @param active — флаг, нужно ли следить за кликами (например, меню открыто).
 */
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  active: boolean = true
) => {
  useEffect(() => {
    if (!active) return;

    const handleClick = (event: MouseEvent) => {
      const el = ref.current;
      if (el && !el.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, active, onOutsideClick]);
};
