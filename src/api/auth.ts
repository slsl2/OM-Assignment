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
		const response = await axiosInstance.post<LoginResponse>("/login?expiresIn=10m", { id, password });
		return response.data;
	} catch (error: unknown) {
		alert("로그인 실패!");
		console.log(error);
	}
};

export const getUserProfileInfo = async (accessToken: string): Promise<UserProfileInfo> => {
	const response = await axiosInstance.get<UserProfileInfo>("/user", {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.data;
};

export const updateProfile = async (formData: FormData): Promise<ProfileUpdateResponse | void> => {
	try {
		const response = await axiosInstance.patch<ProfileUpdateResponse>("/profile", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		return response.data;
	} catch (error: unknown) {
		alert("프로필 변경 실패!");
		console.log(error);
	}
};
