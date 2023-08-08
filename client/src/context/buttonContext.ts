import { create, State } from "zustand";

interface ButtonContext {
  value: string;
  togglePage: (buttonName: string) => void;
}

const useButtonContext = create<ButtonContext>((set) => ({
  value: "",
  togglePage: (buttonName: string) =>
    set((state) => ({ value: buttonName })),
}));

export default useButtonContext;
