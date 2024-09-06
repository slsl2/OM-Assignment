import React from "react";
import { Todo } from "../types/todo.type";

interface TodoItemProps {
	todo: Todo;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	return (
		<li className="p-1 my-1 bg-gray-100">
			<span>{todo.completed ? "✔️" : "❌"}</span>
			<span className="">{todo.title}</span>
		</li>
	);
};

export default TodoItem;
