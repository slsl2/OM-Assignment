import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type QueryClientSetupProps = {
	children: ReactNode;
};

const QueryClientSetup = ({ children }: QueryClientSetupProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
};

export default QueryClientSetup;
