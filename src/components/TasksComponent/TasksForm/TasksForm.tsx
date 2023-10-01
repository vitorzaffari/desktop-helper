import { useState } from "react";
import "./TasksForm.scss";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  name: string;
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
    //validate
    const newTask: Task = {
      id: uuidv4(),
      name: taskInput,
      isDaily: false,
      isCompleted: false,
    };

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
