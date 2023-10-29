import { useState } from "react";
import "./TasksForm.scss";
import { v4 as uuidv4 } from "uuid";

interface Task {
  type: string;
  id: string;
  itemName: string;
  isDaily: boolean;
  isCompleted: boolean;
}

interface TasksFormProps {
  setIsFormOpen: Function;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksForm: React.FC<TasksFormProps> = ({ setIsFormOpen, setTasks }) => {
  const [taskInput, setTaskInput] = useState("");


  function clearInput() {
    setTaskInput("");
  }
  function handleCancel() {
    setIsFormOpen(false);
    clearInput();
  }
  function handleAdd() {
    if(taskInput.trim() === '') {
      setTaskInput('')
      return




    
    }
    const newTask: Task = {
      type: 'Task',
      id: uuidv4(),
      itemName: taskInput,
      isDaily: false,
      isCompleted: false,
    };
    window.bridge.sendData(newTask)

    setTasks((prev) => [...prev, newTask]);
    setIsFormOpen(false);
    clearInput();
  }

  return (
    <div className="tasks-form-div">
      <div className="tasks-label">
        <h3>Add a new task</h3>
      </div>
      <div className="task-input-wrap">
        <input
          className="task-input"
          type="text"
          placeholder=" "
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <label htmlFor="name">Enter the task name</label>
      </div>
      <div className="options-div">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TasksForm;
