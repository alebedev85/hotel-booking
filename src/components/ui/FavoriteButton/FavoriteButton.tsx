"use client";

import { useState } from "react";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  initialIsFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
}

export default function FavoriteButton({ 
  initialIsFavorite = false, 
  onToggle 
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Чтобы не сработал переход по ссылке карточки
    
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button 
      className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
      onClick={handleToggle}
      aria-label="Favorite"
    >
      <span className="material-symbols-outlined">
        favorite
      </span>
    </button>
  );
}