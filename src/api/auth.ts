import axiosInstance from "./axiosInstance";
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	UserProfileInfo,
	ProfileUpdateResponse
} from "../types/auth.type";

export const register = async ({ id, password, nickname }: RegisterRequest): Promise<RegisterResponse> => {
	const response = await axiosInstance.post<RegisterResponse>("/register", {
		id,
		password,
		nickname
	});
	return response.data;
};

export const login = async ({ id, password }: LoginRequest): Promise<LoginResponse | void> => {
	const response = await axiosInstance.post<LoginResponse>("/login?expiresIn=10m", { id, password });
	return response.data;
};

export const getUserProfileInfo = async (accessToken: string): Promise<UserProfileInfo> => {
	const response = await axiosInstance.get<UserProfileInfo>("/user", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.data;
};

export const updateProfile = async (formData: FormData): Promise<ProfileUpdateResponse> => {
	const accessToken = localStorage.getItem("accessToken");
	const response = await axiosInstance.patch<ProfileUpdateResponse>("/profile", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.data;
};
