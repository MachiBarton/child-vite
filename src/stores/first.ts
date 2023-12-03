import { create } from "zustand";

interface FirstState {
  count: number;
  // setToken: (token: string) => void;
  //   getToken: () => string | undefined;
}

export const useFirstState = create<FirstState>(() => ({
  count: 0,
}));

export const count = useFirstState.getState().count;
export const setCount = (count: number) => useFirstState.setState({ count });
