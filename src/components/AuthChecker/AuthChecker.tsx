"use client";

import { useEffect } from "react";
import { checkAuth } from "@/store/authSlice";
import { useAppDispatch } from "@/store";

export default function AuthChecker() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return null; // визуально ничего не рендерим
}