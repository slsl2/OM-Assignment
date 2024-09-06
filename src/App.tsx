import { useEffect } from "react";
import QueryClientSetup from "./QueryClientSetup";
import Router from "./router/Router";
import { useAuthStore } from "./store/authStore";

const App = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);

	useEffect(() => {
		const storedToken = localStorage.getItem("accessToken");
		if (storedToken) {
			setAccessToken(storedToken);
		}
	}, [setAccessToken]);

	return (
		<QueryClientSetup>
			<Router></Router>
		</QueryClientSetup>
	);
};

export default App;
