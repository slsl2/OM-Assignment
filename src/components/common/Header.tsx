import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const navigate = useNavigate();

	const handleLogout = () => {
		useAuthStore.getState().setAccessToken(null);
		localStorage.removeItem("accessToken");
		navigate("/login");
	};

	return (
		<header className="w-full p-4 flex justify-between bg-blue-400 text-white font-bold fixed">
			<div>
				<button className="hover:text-blue-800" onClick={() => navigate("/")}>
					Minji`s Page
				</button>
			</div>

			<div className="flex gap-4">
				{!accessToken ? (
					<>
						<button className="hover:text-blue-800" onClick={() => navigate("/login")}>
							로그인
						</button>
						<button className="hover:text-blue-800" onClick={() => navigate("/register")}>
							회원가입
						</button>
					</>
				) : (
					<>
						<button className="hover:text-blue-800" onClick={handleLogout}>
							로그아웃
						</button>
						<button className="hover:text-blue-800" onClick={() => navigate("/profile")}>
							마이페이지
						</button>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
