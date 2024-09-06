import TodoList from "../components/TodoList";

const Home = () => {
	return (
		<div className="py-[100px] flex flex-col items-center">
			<h1 className="p-4 text-blue-900 text-[40px] font-bold">Todo List</h1>
			<TodoList />
		</div>
	);
};

export default Home;
