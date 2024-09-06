import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://moneyfulpublicpolicy.co.kr",
	headers: {
		"Content-Type": "application/json"
	}
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("accessToken");
			alert("세션이 만료되었습니다. 다시 로그인해주세요.");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
