import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Описываем структуру данных нашего контекста.
 * activeId — ID отеля, на который навели мышкой.
 * setActiveId — функция для изменения этого ID.
 */
interface HotelHoverContextType {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

// Создаем контекст с начальным значением undefined
const HotelHoverContext = createContext<HotelHoverContextType | undefined>(undefined);

/**
 * Провайдер, который будет оборачивать HotelList и HotelMap.
 * Он хранит состояние активного отеля и передает его вниз по дереву.
 */
export const HotelHoverProvider = ({ children }: { children: ReactNode }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <HotelHoverContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </HotelHoverContext.Provider>
  );
};

/**
 * Кастомный хук для удобного доступа к контексту.
 * Проверяет, используется ли хук внутри провайдера, чтобы избежать ошибок.
 */
export const useHotelHover = () => {
  const context = useContext(HotelHoverContext);
  
  if (!context) {
    throw new Error("useHotelHover must be used within a HotelHoverProvider");
  }
  
  return context;
};