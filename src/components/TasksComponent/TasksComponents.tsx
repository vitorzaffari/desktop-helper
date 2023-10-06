import Options from "../../SvgComponents/Options";
import Rice from "../../SvgComponents/Rice";
import TaskCard from "./TaskCard/TaskCard";
import "./TasksComponent.scss";
import TasksForm from "./TasksForm/TasksForm";
import { useEffect, useState } from "react";

interface Task {
  type: string;
  id: string;
  itemName: string;
  isDaily: boolean;
  isCompleted: boolean;
}

const TasksComponents = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleOpenForm() {

    setIsFormOpen(!isFormOpen);
  }
    function handleOpenContainer(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    //opens the container if clicked on the header but not on the header buttons

    if (e.target instanceof Element) {
      const tagName = e.target.tagName;
      // console.log(`Clicked element tag name: ${tagName}`);
      if (tagName === "BUTTON" || tagName === "svg" || tagName === "path") {
        return;
      } else {
        setIsContainerOpen(!isContainerOpen)
        
      }
    }
  }

  useEffect(() => {
    console.log(tasks);

  }, [tasks]);
  useEffect(() => {

    const getRetrievedData = window.getData.getRetrievedData();
    if (getRetrievedData) {
      setTasks(getRetrievedData.tasksArray);
    }

  }, [])

  return (
    <div className="tasks-helper">
      <div className="tasks-header" onClick={handleOpenContainer}>
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
      <div className={`tasks-container-div ${isContainerOpen ? '' : 'closed'}`} >
          <div className="tasks-container-inner">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                isCompleted={task.isCompleted}
                isDaily={task.isDaily}
                name={task.itemName}
                id={task.id}
                setTasks={setTasks}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksComponents;
