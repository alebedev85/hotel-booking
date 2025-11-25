import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: number; email: string } | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: null,
};

// Thunk для логина
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data.error || "Ошибка входа");

      return data.user;
    } catch (err) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

// Thunk для регистрации
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data.error || "Ошибка регистрации");

      return data.user;
    } catch (err) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

// Thunk для разлогирования
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    // Удаляем cookie с токеном на сервере
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (error) {
    console.warn("Ошибка при logout-запросе:", error);
  }
  // Возвращаем ничего — просто очищаем store
});

// Очистка ошибок
export const clearError = createAsyncThunk(
  "auth/clearError",
  async (_, { dispatch }) => {
    return;
  }
);

// Thunk для проверки авторизации при старте приложения
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/check", { method: "GET" });
      const data = await res.json();

      if (!res.ok || !data.authenticated)
        return rejectWithValue("Не авторизован");

      return data.user; // { id, email }
    } catch (err) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Логин
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Регистрация
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.authenticated = true; // сразу авторизуем пользователя
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Разлогирование
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });

    // Проверка авторизации
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
