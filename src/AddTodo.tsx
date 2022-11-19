interface Props{
  posting: boolean;
  label: string;
  setLabel: (label: string) => void;
  addTodo: (label: string) => void;
}

export const AddTodo = ({posting, label, setLabel, addTodo}:Props) => {

  return (
    <div className={`add-todo-container ${posting ? 'posting' : ''}`}>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Buy groceries"
        disabled={posting}
      />
      <button disabled={posting} onClick={() => addTodo(label)}>
        {posting ? 'please wait...' : 'Add ToDo'}
      </button>
    </div>
  );
}