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
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // 미리보기 URL
	const [nickname, setNickname] = useState<string>("");

	// 로그인하지 않은 경우 로그인 페이지로 리디렉션
	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	// 유저 프로필 정보 불러오기
	const {
		data: profile,
		isPending,
		error,
		refetch
	} = useQuery<UserProfileInfo>({
		queryKey: ["userProfile"],
		queryFn: () => {
			if (!accessToken) return Promise.reject("No access token");
			return getUserProfileInfo(accessToken);
		},
		enabled: !!accessToken
	});

	// 프로필 업데이트 mutation
	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			if (!accessToken) throw new Error("No access token");
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

	// 프로필 업데이트 처리
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

	// 이미지 미리보기 설정
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatar(file);
			setAvatarPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
		}
	};

	const handleReset = () => {
		refetch(); // fetch를 다시 해서 데이터를 초기화
		setAvatar(null); // 선택된 아바타 파일 초기화
		setAvatarPreview(profile?.avatar || null); // 미리보기 다시 설정
		setNickname(profile?.nickname || "");
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	if (isPending) return <Loading />;
	if (error) return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;

	return (
		<div>
			<div>
				<img className="w-16" src={avatarPreview || profile?.avatar || "/images/default-avatar.png"} alt="avatar" />
				<h2>{profile?.id}</h2>
				<input type="file" accept="image/*" onChange={handleImageChange} />
				<input
					type="text"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					placeholder={profile?.nickname || "Nickname"}
				/>
				<button onClick={handleGoBack}>뒤로</button>
				<button onClick={handleReset}>초기화</button>
				<button onClick={handleProfileUpdate} disabled={mutation.isPending}>
					{mutation.isPending ? "Updating..." : "Update Profile"}
				</button>
			</div>
		</div>
	);
};

export default Profile;
