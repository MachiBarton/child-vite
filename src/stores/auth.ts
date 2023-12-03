import { create } from "zustand";

interface AuthState {
  token?: string;
  // setToken: (token: string) => void;
  //   getToken: () => string | undefined;
}

export const useAuthState = create<AuthState>(() => ({
  token: undefined,
}));

export const token = useAuthState.getState().token;
export const setToken = (token: string) => useAuthState.setState({ token });
