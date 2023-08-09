import React from "react";
import "./App.css";
import { BiLogoGmail, BiLogoGithub, BiLogoBehance, BiLogoLinkedin } from "react-icons/bi";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    if (todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");

    } else {

        alert("Enter Valid Task");
        setTodo("");
    }
  }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

    return (
        <div className="App">
          <h1 className="heading">Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit">Add Todo</button>
          </form>
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div class="text">{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button className="btn1" onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button className="btn2" onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}

                <button className="btn3" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
          <div class="wrapper">
    <footer class="footer">
        <div>
        <div class="row">
        <a href="mailto:maiamanhoon@gmail.com"><BiLogoGmail /></a>
        <a href="https://github.com/AmanKumarVerma11"><BiLogoGithub /></a>
        <a href="https://www.behance.net/amannn"><BiLogoBehance /></a>
        <a href="https://www.linkedin.com/in/aman-kr-verma11/"><BiLogoLinkedin /></a>
        </div>
        <div class="row">
        || Developed By: Aman kumar Verma || 
        </div>
        </div>
    </footer>
    </div>
        </div>
      );
    };

export default App;