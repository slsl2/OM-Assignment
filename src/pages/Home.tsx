import TodoList from "../components/TodoList";

const Home = () => {
	return (
		<>
			<div className="">
				<div className="flex items-center justify-center">
					<h1 className="p-4 text-blue-900 text-[40px] font-bold">Todo List</h1>
				</div>
				<TodoList />
			</div>
		</>
	);
};

export default Home;
