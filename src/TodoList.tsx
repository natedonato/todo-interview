import { ToDo } from './ApiClient';
import { TodoItem } from './TodoItem';

interface Props{
  todos: ToDo[];
  toggleDone: (id: string)=>void;
}

export const TodoList = ({todos, toggleDone}:Props) => {
  return(
    <>
      {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} toggleDone={toggleDone} />))}
    </>
  );
}