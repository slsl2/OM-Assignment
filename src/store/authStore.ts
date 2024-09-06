import { create } from "zustand";

export type AuthStateType = {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthStateType>((set) => ({
	accessToken: localStorage.getItem("accessToken") || null,
	setAccessToken: (token) => {
		localStorage.setItem("accessToken", token || "");
		set({ accessToken: token });
	}
}));
