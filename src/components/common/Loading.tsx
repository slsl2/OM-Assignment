import Spinner from "/images/loading-spinner.gif";

const Loading = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<img src={Spinner} alt="로딩" width="10%" />
		</div>
	);
};
export default Loading;
