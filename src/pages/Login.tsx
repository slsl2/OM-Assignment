import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
	const [id, setId] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const accessToken = useAuthStore((state) => state.accessToken);
	const navigate = useNavigate();

	const handleLogin = async () => {
		const response = await login({ id, password });

		if (response && response.accessToken) {
			setAccessToken(response.accessToken);
			localStorage.setItem("accessToken", response.accessToken);
			console.log("Zustand AccessToken:", accessToken);
			navigate("/");
		}
	};

	return (
		<div>
			<input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
			<button onClick={handleLogin}>로그인</button>
		</div>
	);
};

export default Login;
