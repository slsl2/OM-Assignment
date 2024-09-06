import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

const Register = () => {
	const [id, setId] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [nickname, setNickname] = useState<string>("");
	const navigate = useNavigate();

	const handleRegister = async () => {
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

		try {
			const response = await register({ id, password, nickname });
			if (response) {
				alert("회원가입이 완료되었습니다.");
				navigate("/login");
			}
		} catch (error) {
			console.error("회원가입 중 오류가 발생했습니다:", error);
			// 사용자에게 오류를 알리는 방법을 추가할 수 있습니다.
		}
	};

	return (
		<div>
			<input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
			<input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
			<button onClick={handleRegister}>회원가입</button>
			<button onClick={() => navigate("/login")}>로그인</button>
		</div>
	);
};

export default Register;
