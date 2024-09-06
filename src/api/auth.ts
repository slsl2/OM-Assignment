import axiosInstance from "./axiosInstance";
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	UserProfileInfo,
	ProfileUpdateResponse
} from "../types/auth.type";

export const register = async ({ id, password, nickname }: RegisterRequest): Promise<RegisterResponse | void> => {
	try {
		const response = await axiosInstance.post<RegisterResponse>("/register", {
			id,
			password,
			nickname
		});
		return response.data;
	} catch (error: unknown) {
		alert("회원가입 실패!");
		console.log(error);
	}
};

export const login = async ({ id, password }: LoginRequest): Promise<LoginResponse | void> => {
	try {
		const response = await axiosInstance.post<LoginResponse>("/login?expiresIn=100m", { id, password });
		return response.data;
	} catch (error: unknown) {
		alert("로그인 실패!");
		console.log(error);
	}
};

export const getUserProfileInfo = async (accessToken: string): Promise<UserProfileInfo> => {
	if (!accessToken) {
		throw new Error("로그인 정보 만료");
	}
	const response = await axiosInstance.get<UserProfileInfo>("/user", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	});
	console.log(response.data);
	return response.data;
};

export const updateProfile = async (formData: FormData): Promise<ProfileUpdateResponse> => {
	const accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		try {
			const response = await axiosInstance.patch<ProfileUpdateResponse>("/profile", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${accessToken}`
				}
			});
			return response.data;
		} catch (error: unknown) {
			console.error("프로필 변경 실패!", error);
			throw new Error("프로필 변경 실패!");
		}
	} else {
		throw new Error("AccessToken이 없습니다.");
	}
};
