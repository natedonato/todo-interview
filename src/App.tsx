import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import './App.css';

const apiClient = new ApiClient(false);

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');

  useEffect(() => {
    apiClient
      .getToDos()
      .then((fetchedTodos) => setTodos(fetchedTodos))
      .catch(console.error);
  }, [setTodos]);

  const addTodo = (label: string) => {
    apiClient.addTodo(label).then((newTodo) => {
      setTodos((oldTodos) => {
        return [...oldTodos, newTodo]
      })
      setLabel('');
    })
  }

  const toggleDone = (id: string) => {
    apiClient.toggleDone(id).then(todoToUpdate => {
      if(todoToUpdate !== undefined){
        setTodos((oldTodos) => {
          let newTodos = [...oldTodos].map( oldTodo => {
            if(oldTodo.id === id){
              return {...oldTodo, done: !oldTodo.done}
            }else{
              return oldTodo;
            }
          });
          return newTodos;
        })
      }
    })
  }

  return (
    <>
      <h1>To Do List</h1>

      <div className="add-todo-container">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />
        <button onClick={() => addTodo(label)}>Add ToDo</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <label
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.label}
          </label>
          <button onClick={() => toggleDone(todo.id)}>
            Mark {todo.done ? 'Undone' : 'Done'}
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
