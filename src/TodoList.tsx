import { ToDo } from './ApiClient';
import { TodoItem } from './TodoItem';

interface Props {
  todos: ToDo[];
  toggleDone: (id: string) => void;
  idsInProcess: { [id: string]: boolean };
  reorderTodos: (idx1: number, idx2: number) => void;
}

export const TodoList = ({todos, toggleDone, idsInProcess, reorderTodos}:Props) => {


  return (
    <>
      {todos.map((todo, idx) => (
        <TodoItem
          reorderTodos={reorderTodos}
          index={idx}
          awaitingMark={idsInProcess[todo.id] === true}
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
        />
      ))}
    </>
  );
}