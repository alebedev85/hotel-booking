"use client";

import { useState } from "react";
import { clsx } from "clsx";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  initialIsFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  className?: string; // Теперь это критически важный пропс
}

export default function FavoriteButton({ 
  initialIsFavorite = false, 
  onToggle,
  className 
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button 
      className={clsx(
        styles.favoriteBtn, 
        isFavorite && styles.active, 
        className // Стили позиционирования придут отсюда
      )}
      onClick={handleToggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <span className="material-symbols-outlined">
        favorite
      </span>
    </button>
  );
}