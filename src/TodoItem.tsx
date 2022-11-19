import { useRef, useState } from 'react';
import { ToDo } from './ApiClient';

interface Props {
  todo: ToDo;
  toggleDone: (id: string) => void;
  awaitingMark: boolean;
  index: number;
  reorderTodos: (idx1: number, idx2: number) => void;
}

export const TodoItem = ({todo, toggleDone, awaitingMark, index, reorderTodos}:Props) => {
  const [dragHovering, setDragHovering] = useState(false);

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('draggedIdx', index.toString());
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const droppedIdx = parseInt(event.dataTransfer.getData('draggedIdx'));
    reorderTodos(droppedIdx, index);
    setDragHovering(false);
  };

  const handleDragEnter  = (event: React.DragEvent<HTMLDivElement>) => {
    const draggedIdx = parseInt(event.dataTransfer.getData('draggedIdx'));
    if(draggedIdx !== index){
      setDragHovering(true);
    }
  }

  const handleDragExit = (event: React.DragEvent<HTMLDivElement>) => {
    setDragHovering(false);
  };

  return (
    <div
      draggable
      key={todo.id}
      onDragStart={(e) => dragStart(e)}
      onDragOver = {(e) => enableDropping(e)}
      onDragEnter = {(e) => handleDragEnter(e)}
      onDragLeave = {(e) => handleDragExit(e)}
      onDrop = { handleDrop }
      className="todo-item"
      style={{backgroundColor: dragHovering ? '#90EE90' : 'transparent'}}
    >
      <label
        style={{
          textDecoration: todo.done ? 'line-through' : 'none',
          opacity: awaitingMark ? '50%' : '100%',
        }}
      >
        {todo.label}
      </label>
      <button disabled={awaitingMark} onClick={() => toggleDone(todo.id)}>
        Mark {todo.done ? 'Undone' : 'Done'}
      </button>
    </div>
  );
}