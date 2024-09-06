import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfileInfo, updateProfile } from "../api/auth";
import { UserProfileInfo, ProfileUpdateResponse } from "../types/auth.type";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/common/Loading";

const Profile = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [avatar, setAvatar] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [nickname, setNickname] = useState<string>("");

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	const {
		data: profile,
		isPending,
		error,
		refetch
	} = useQuery<UserProfileInfo>({
		queryKey: ["userProfile"],
		queryFn: () => {
			if (!accessToken) return Promise.reject("로그인 정보 없음");
			return getUserProfileInfo(accessToken);
		},
		enabled: !!accessToken
	});

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			if (!accessToken) throw new Error("로그인 정보 없음");
			return updateProfile(formData);
		},
		onSuccess: (data: ProfileUpdateResponse) => {
			queryClient.invalidateQueries({ queryKey: ["userProfile"] });
			alert(data.message);
		},
		onError: (error: unknown) => {
			console.error("프로필 업데이트 중 오류가 발생했습니다:", error);
			alert("프로필 업데이트 중 오류가 발생했습니다.");
		}
	});

	const handleProfileUpdate = async () => {
		const formData = new FormData();

		// avatar가 없으면 기존 프로필 이미지 사용
		if (avatar) {
			formData.append("avatar", avatar);
		} else if (profile?.avatar) {
			formData.append("avatar", profile.avatar);
		}

		// 닉네임이 비어 있으면 기존 닉네임 사용
		if (nickname) {
			formData.append("nickname", nickname);
		} else if (profile?.nickname) {
			formData.append("nickname", profile.nickname);
		}

		if (!avatar && !nickname) {
			alert("변경할 내용이 없습니다.");
			return;
		}

		mutation.mutate(formData);
	};

	// 이미지 미리보기
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatar(file);
			setAvatarPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
		}
	};

	const handleReset = () => {
		refetch();
		setAvatar(null);
		setAvatarPreview(profile?.avatar || null);
		setNickname(profile?.nickname || "");
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	if (isPending) return <Loading />;
	if (error) return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;

	return (
		<div className="px-4 py-[100px] w-[80%] max-w-[800px] mx-auto flex flex-col items-center gap-2">
			<h2 className="font-bold text-[20px] bg-gradient-text p-2 text-white">@{profile?.id}</h2>
			<img className="w-[120px]" src={avatarPreview || profile?.avatar || "/images/default-avatar.png"} alt="avatar" />
			<input type="file" accept="image/*" onChange={handleImageChange} />
			<div className="flex gap-2 items-center">
				<span>닉네임</span>
				<input
					type="text"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					placeholder={profile?.nickname || "닉네임"}
					className="p-2 bg-gray-100"
					maxLength={10}
				/>
			</div>
			<div className="flex flex-col gap-2 w-full mt-8">
				<button className="p-2 bg-gray-200 rounded-[10px] w-full hover:bg-gray-300" onClick={handleGoBack}>
					뒤로가기
				</button>
				<button className="p-2 bg-gray-200 rounded-[10px] w-full hover:bg-gray-300" onClick={handleReset}>
					초기화
				</button>
				<button
					className="p-2 text-white bg-blue-400 rounded-[10px] w-full hover:bg-blue-500"
					onClick={handleProfileUpdate}
					disabled={mutation.isPending}
				>
					수정완료
				</button>
			</div>
		</div>
	);
};

export default Profile;
