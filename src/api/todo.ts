import axios from "axios";
import { Todo } from "../types/todo.type";

const TODO_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchTodos = async (): Promise<Todo[]> => {
	const response = await axios.get(`${TODO_BASE_URL}/todos`);
	return response.data;
};

export const fetchTodoById = async (id: number): Promise<Todo> => {
	const response = await axios.get(`${TODO_BASE_URL}/todos/${id}`);
	return response.data;
};
