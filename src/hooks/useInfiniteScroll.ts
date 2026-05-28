"use client";

import { useEffect, useState, useRef } from "react";

// Описание входящих параметров хука
interface UseInfiniteScrollProps<T> {
  allElements: T[];          // Полный массив элементов, полученный с бэкенда (из кэша RTK Query)
  step?: number;             // Количество элементов, добавляемых за один шаг прокрутки
  isLoading?: boolean;       // Флаг первичной или фоновой загрузки данных
  resetDependency?: unknown; // Зависимость (например, cityId), при изменении которой скролл сбрасывается в начало
}

/**
 * Кастомный хук для реализации производительного бесконечного скролла
 * на базе IntersectionObserver API.
 */
export function useInfiniteScroll<T>({
  allElements,
  step = 10,
  isLoading = false,
  resetDependency,
}: UseInfiniteScrollProps<T>) {
  // Текущее количество отображаемых элементов на клиенте
  const [limit, setLimit] = useState(step);
  
  // Ссылка на DOM-элемент триггера (лоадера), за появлением которого на экране мы следим
  const triggerRef = useRef<HTMLDivElement | null>(null);

  /**
   * ОПТИМИЗАЦИЯ: totalElementsRef
   * Мы сохраняем общую длину массива в ref-объект. Это позволяет основному эффекту
   * обсервера всегда видеть актуальный размер общего пула данных, не вызывая
   * перезапуск самого эффекта при каждом изменении данных. Избавляет от старых замыканий.
   */
  const totalElementsRef = useRef(allElements.length);
  useEffect(() => {
    totalElementsRef.current = allElements.length;
  }, [allElements.length]);

  /**
   * СБРОС ЛИМИТА (например, при смене города)
   * Если пользователь выбирает другой город, мы обязаны вернуть отображение 
   * к начальным 10 элементам, чтобы он не видел пустые прокрученные области.
   */
  useEffect(() => {
    setLimit(step);
  }, [resetDependency, step]);

  /**
   * ИНИЦИАЛИЗАЦИЯ И СЛЕЖКА ЗА СКРОЛЛОМ
   * Этот эффект настраивает IntersectionObserver. Он перезапускается ТОЛЬКО если
   * меняется статус глобальной загрузки, сбрасывается город или меняется шаг.
   * Он стабилен и не перезапускается при обычном скролле.
   */
  useEffect(() => {
    // Если идет первоначальная загрузка (данных еще нет), прерываем выполнение,
    // чтобы обзервер не зацепил пустой DOM-элемент раньше времени.
    if (isLoading) return;

    const currentTrigger = triggerRef.current;
    if (!currentTrigger) return;

    // Создаем экземпляр наблюдателя
    const observer = new IntersectionObserver(
      (entries) => {
        // Берем первый (и единственный в нашем случае) отслеживаемый элемент
        const [entry] = entries;
        
        // Если триггер пересёк установленную границу (появился в видимой зоне)
        if (entry.isIntersecting) {
          
          // Безопасно обновляем стейт лимита через функциональный апдейт
          setLimit((prevLimit) => {
            // Если мы уже вывели все элементы, ничего не делаем
            if (prevLimit >= totalElementsRef.current) return prevLimit;
            
            // Увеличиваем лимит на шаг (step), но не даем ему перевалить за общую длину массива
            return Math.min(prevLimit + step, totalElementsRef.current);
          });
        }
      },
      {
        root: null, // null означает, что областью слежки выступает окно браузера (viewport)
        
        // rootMargin: "0px 0px 100px 0px" расширяет виртуальную зону триггера вниз на 100px.
        // Элемент считается "пересеченным", когда пользователь недоскроллил до него всего 100px.
        // Это обеспечивает бесшовность: новые карточки рендерятся ДО того, как пользователь увидит дно.
        rootMargin: "0px 0px 100px 0px", 
        
        // Процент видимости триггера, необходимый для срабатывания. 
        // 0.01 означает, что достаточно появления хотя бы 1% высоты триггера на экране.
        threshold: 0.01, 
      }
    );

    // Запускаем отслеживание DOM-элемента лоадера
    observer.observe(currentTrigger);

    /**
     * ФУНКЦИЯ ОЧИСТКИ (CLEANUP)
     * Вызывается при размонтировании компонента или перед перезапуском эффекта.
     * Обязательно отписываемся от DOM-элемента, чтобы предотвратить утечки памяти.
     */
    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [isLoading, resetDependency, step]);

  // Нарезаем исходный массив отелей на порцию, которую разрешено показывать текущим лимитом
  const visibleElements = allElements.slice(0, limit);
  
  // Флаг указывает, остались ли еще скрытые элементы в общем массиве
  const hasMore = allElements.length > limit;

  // Возвращаем данные наружу для использования в компоненте страницы
  return {
    visibleElements, // Передаем в <HotelsList hotels={visibleElements} />
    triggerRef,      // Вешаем на <div ref={triggerRef}> под списком
    hasMore,         // Используем для условного рендеринга триггера {hasMore && <div ref={triggerRef}...>}
  };
}