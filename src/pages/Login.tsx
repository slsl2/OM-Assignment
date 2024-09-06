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
		<div>
			<input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
			<button onClick={handleLogin}>로그인</button>
			{mutation.isError && <p>로그인 실패: {mutation.error.message}</p>}
		</div>
	);
};

export default Login;
