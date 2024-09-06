import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

const Register = () => {
	const [id, setId] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [nickname, setNickname] = useState<string>("");
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: () => register({ id, password, nickname }),
		onSuccess: () => {
			alert("회원가입이 완료되었습니다.");
			navigate("/login");
		},
		onError: (error) => {
			console.error("회원가입 중 오류가 발생했습니다: ", error);
			alert("회원가입 중 오류가 발생했습니다. 이미 존재하는 아이디일 수 있으니 다른 아이디로 다시 시도해보세요.");
		}
	});

	const handleRegister = () => {
		if (id.length < 4 || id.length > 10) {
			alert("아이디는 4글자에서 10글자 이내로만 가능합니다!");
			return;
		}
		if (password.length < 8 || password.length > 15) {
			alert("비밀번호는 8글자에서 15글자 이내로만 가능합니다!");
			return;
		}
		if (nickname.length < 2 || nickname.length > 10) {
			alert("닉네임은 2글자에서 10글자 이내로만 가능합니다!");
			return;
		}

		mutation.mutate();
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="w-[400px] flex flex-col gap-2 p-4 bg-white rounded shadow-md">
				<h1 className="text-center font-semibold">REGISTER</h1>
				<input
					className="p-4 bg-gray-200"
					type="text"
					value={id}
					onChange={(e) => setId(e.target.value)}
					placeholder="아이디"
					maxLength={10}
				/>
				<input
					className="p-4 bg-gray-200"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="비밀번호"
					maxLength={15}
				/>
				<input
					className="p-4 bg-gray-200"
					type="text"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					placeholder="닉네임"
					maxLength={10}
				/>
				<button
					className="p-4 text-white bg-blue-400 rounded-[10px] w-full hover:bg-blue-500"
					onClick={handleRegister}
					disabled={mutation.isPending}
				>
					회원가입
				</button>
				<button
					className="p-4 text-white bg-gray-400 rounded-[10px] w-full hover:bg-gray-500"
					onClick={() => navigate("/login")}
				>
					로그인
				</button>
			</div>
		</div>
	);
};

export default Register;
