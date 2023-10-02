import { useState } from "react";
import "./TaskCard.css";

interface TaskItem {
  id: string;
  name: string;
  isCompleted: boolean;
  isDaily: boolean;
}

const TaskCard: React.FC<TaskItem> = ({ id, name, isCompleted, isDaily }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="timer-card-component">
      {/* {isDaily ? (
        <>
          <p className="daily-span">Daily task</p>
        </>
      ) : (
        <>
          <p className="daily-span">Not daily</p>
        </>
      )} */}
      <div className={`input-wrap ${isChecked ? "checked" : ""}`} onClick={() => setIsChecked(!isChecked)}>
        <input
          className={`check }`}
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label>
          <span></span>
          {name}
        </label>
      </div>
      <div className="timer-options">
      </div>
      <div className="buttons-div">
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </div>
  );
};

export default TaskCard;
