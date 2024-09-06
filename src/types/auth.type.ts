export type RegisterRequest = {
	id: string;
	password: string;
	nickname: string;
};
export type RegisterResponse = {
	message: string;
	success: boolean;
};
export type LoginRequest = {
	id: string;
	password: string;
};
export type LoginResponse = {
	accessToken: string;
	userId: string;
	success: boolean;
	avatar: string | null;
	nickname: string;
};
export type UserProfileInfo = {
	id: string;
	nickname: string;
	avatar: string | null;
	success: boolean;
};
export type ProfileUpdateRequest = {
	avatar?: File;
	nickname?: string;
};
export type ProfileUpdateResponse = {
	avatar: string;
	nickname: string;
	message: string;
	success: boolean;
};
