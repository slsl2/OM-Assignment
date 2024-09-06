import { create } from "zustand";

export type AuthStateType = {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthStateType>((set) => ({
	accessToken: localStorage.getItem("accessToken") || null,
	setAccessToken: (token) => {
		if (token) {
			localStorage.setItem("accessToken", token);
			set({ accessToken: token });

			// 토큰 만료 시간 : 10분 후
			const expiresAt = Date.now() + 600000;
			localStorage.setItem("expiresAt", expiresAt.toString());

			// 10분 후 토큰 삭제
			setTimeout(() => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("expiresAt");
				set({ accessToken: null });
				alert("로그인 정보 만료");
				window.location.href = "/login"; // 새로고침 대신 페이지 이동
			}, 600000);
		} else {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("expiresAt");
			set({ accessToken: null });
		}
	}
}));
