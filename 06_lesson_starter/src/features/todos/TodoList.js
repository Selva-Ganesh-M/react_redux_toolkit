import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      userId: 1,
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  let content;
  if (isLoading) {
    return "loading";
  } else if (isSuccess) {
    // content = JSON.stringify(todos);
    content = todos.map((todo) => (
      <div
        key={todo.id}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              console.log(todo.id);
              updateTodo({ ...todo, completed: !todo.completed }, todo.id);
            }}
          ></input>
        </div>
        <div>
          <label>{todo.title}</label>
        </div>
        <div>
          <a onClick={() => deleteTodo(todo.id)} style={{ color: "red" }}>
            delete
          </a>
        </div>
      </div>
    ));
  } else if (isError) {
    return error;
  }

  return (
    <main>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
          <input
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className="submit">
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </form>
      {content}
    </main>
  );
};
export default TodoList;
