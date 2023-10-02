import Options from "../../SvgComponents/Options";
import Rice from "../../SvgComponents/Rice";
import TaskCard from "./TaskCard/TaskCard";
import "./TasksComponent.scss";
import TasksForm from "./TasksForm/TasksForm";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  name: string;
  isDaily: boolean;
  isCompleted: boolean;
}

const TasksComponents = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleOpenForm() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="tasks-helper">
      <div className="tasks-header">
        <h1 className="tasks-title">Tasks</h1>
        <div className="dates-options">
          <button>
            Options <Options />
          </button>
          <button onClick={handleOpenForm}>
            Add <Rice />
          </button>
        </div>
      </div>
      <div className="tasks-body-div">
        <div className={`tasks-form ${isFormOpen ? "open" : ""}`}>
          {" "}
          {/* fixed height */}
          <TasksForm setIsFormOpen={setIsFormOpen} setTasks={setTasks} />
        </div>
        <div className="tasks-container-div">
          <div className="tasks-container-inner">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                isCompleted={task.isCompleted}
                isDaily={task.isDaily}
                name={task.name}
                id={task.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksComponents;
