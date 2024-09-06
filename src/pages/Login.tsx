import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useState } from "react";

const Login = () => {
	const [id, setId] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: async () => {
			const response = await login({ id, password });
			if (response && response.accessToken) {
				setAccessToken(response.accessToken);
				localStorage.setItem("accessToken", response.accessToken);
			}
			return response;
		},
		onSuccess: () => {
			navigate("/");
		},
		onError: (error) => {
			console.error("Login failed:", error);
		}
	});

	const handleLogin = () => {
		mutation.mutate();
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="w-[400px] flex flex-col gap-2 p-4 bg-white rounded shadow-md">
				<h1 className="text-center font-semibold">LOGIN</h1>
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
				<button className="p-4 text-white bg-blue-400 rounded-[10px] w-full hover:bg-blue-500" onClick={handleLogin}>
					로그인
				</button>
				<button
					className="p-4 text-white bg-gray-400 rounded-[10px] w-full hover:bg-gray-500"
					onClick={() => navigate("/register")}
				>
					회원가입
				</button>
				{mutation.isError && <p>로그인 실패: {mutation.error.message}</p>}
			</div>
		</div>
	);
};

export default Login;
