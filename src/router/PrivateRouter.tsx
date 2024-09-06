import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PrivateRoute = ({ component: Component }: { component: React.ComponentType }) => {
	const { accessToken } = useAuthStore();

	return accessToken ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
