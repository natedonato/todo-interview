import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import { TodoList } from './TodoList' 
import './App.css';
import { AddTodo } from './AddTodo';

const apiClient = new ApiClient(true);

function App() {
  // state for todo list loading
  const [listLoaded, setListLoaded] = useState<boolean>(false);
  
  const [todos, setTodos] = useState<ToDo[]>([]);

  // state for which todos are waiting for api to toggle done status
  const [idsInProcess, setIdsInProcess] = useState<{[id: string]: boolean }>({});
  
  const [label, setLabel] = useState('');
  
  // state for when todo is in process of being added to DB
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


  const reorderTodos = (oldIndex: number, newIndex:number) => {
    let newOrder = [...todos];
    let movingElement = todos[oldIndex];
    newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, movingElement);

    apiClient.saveTodos(newOrder); // cheating because no api delay / promise on this method
    setTodos(newOrder);
  }

  const toggleDone = (id: string) => {
    setIdsInProcess({...idsInProcess, [id]: true})
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
      setIdsInProcess(currentIds => {
        let newIds = {...currentIds};
        delete newIds[id];
        return newIds;
      });
    })
  }

  return (
    <>
      <h1>To Do List</h1>

      <AddTodo
        label={label}
        setLabel={setLabel}
        posting={posting}
        addTodo={addTodo}
      />

      {listLoaded ? null : <h1> Loading todo list...</h1>}

      {listLoaded && (
        <TodoList
          idsInProcess={idsInProcess}
          todos={todos}
          toggleDone={toggleDone}
          reorderTodos={reorderTodos}
        />
      )}
    </>
  );
}

export default App;
