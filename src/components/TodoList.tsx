import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todo";
import Loading from "./common/Loading";
import TodoItem from "./TodoItem";

const TodoList = () => {
	const {
		data: todos,
		isPending,
		error
	} = useQuery({
		queryKey: ["todos"],
		queryFn: fetchTodos
	});

	if (isPending) return <Loading />;
	if (error) return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;

	const workingTodos = todos.filter((todo) => !todo.completed);
	const doneTodos = todos.filter((todo) => todo.completed);

	return (
		<div id="cards-container" className="m-2 flex gap-2">
			<div id="cards-working">
				<h2 className="text-[20px] font-bold py-4">Working🚴🏻‍♀️✍🏻</h2>
				<ul className="todo-ul">
					{workingTodos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			</div>
			<div id="cards-done">
				<h2 className="text-[20px] font-bold py-4">Done✨🎉</h2>
				<ul className="todo-ul">
					{doneTodos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default TodoList;
