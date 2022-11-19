import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import { TodoList } from './TodoList' 
import './App.css';
import { AddTodo } from './AddTodo';

const apiClient = new ApiClient(true);

function App() {
  const [listLoaded, setListLoaded] = useState<boolean>(false);
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');
  const [posting, setPosting] = useState<boolean>(false);

  useEffect(() => {
    apiClient
      .getToDos()
      .then((fetchedTodos) => {setTodos(fetchedTodos)
        setListLoaded(true);
      }
      )
      .catch(console.error);
  }
  , [setTodos]);

  const addTodo = (label: string) => {
    setPosting(true);
    apiClient.addTodo(label).then((newTodo) => {
      setTodos((oldTodos) => {
        return [...oldTodos, newTodo]
      })
      setLabel('');
      setPosting(false);
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

      <AddTodo label={label} setLabel={setLabel} posting={posting} addTodo={addTodo} />

      {listLoaded ? null : <h1> Loading todo list...</h1>}

      { listLoaded && <TodoList todos={todos} toggleDone={toggleDone} />}
    </>
  );
}

export default App;
