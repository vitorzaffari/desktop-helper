import Options from "../../SvgComponents/Options";
import Rice from "../../SvgComponents/Rice";
import "./TasksComponent.scss";
import TasksForm from "./TasksForm/TasksForm";

const TasksComponents = () => {
  return (
    <div className="tasks-helper">
      <div className="tasks-header">
        <h1 className="tasks-title">Tasks</h1>
        <div className="dates-options">
          <button>
            Options <Options />
          </button>
          <button
          //   onClick={handleOpenForm}
          >
            Add <Rice />
          </button>
        </div>
      </div>
      <div className="tasks-body-div">
        <div className="tasks-form">
          <TasksForm />
        </div>
      </div>
    </div>
  );
};

export default TasksComponents;
