import { ToDo } from './ApiClient';

interface Props{
  todo: ToDo;
  toggleDone: (id: string)=>void;
}

export const TodoItem = ({todo, toggleDone}:Props) => {

  return (
    <div key={todo.id} className="todo-item">
      <label style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.label}
      </label>
      <button onClick={() => toggleDone(todo.id)}>
        Mark {todo.done ? 'Undone' : 'Done'}
      </button>
    </div>
  );
}