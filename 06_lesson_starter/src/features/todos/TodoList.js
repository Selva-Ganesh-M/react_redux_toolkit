import { useGetTodosQuery } from "../api/apiSlice";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    //addTodo
    setNewTodo("");
  };

  let content;
  if (isLoading) {
    return "loading";
  } else if (isSuccess) {
    content = JSON.stringify(todos);
    // return JSON.stringify(todos, null, 2);
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
