import { useEffect, useState } from "react";
import "./TaskCard.css";
import Edit from "../../../SvgComponents/Edit";
import Delete from "../../../SvgComponents/Delete";
import Confirm from "../../../SvgComponents/Confirm";
import Cancel from "../../../SvgComponents/Cancel";

interface TaskProps {
  id: string;
  name: string;
  isCompleted: boolean;
  isDaily: boolean;
  setTasks: Function;
}

interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
  isDaily: boolean;
  type: boolean;
}

const TaskCard: React.FC<TaskProps> = ({
  id,
  name,
  isCompleted,
  isDaily,
  setTasks,
}) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [taskName, setTaskName] = useState(name);
  const [newTaskName, setNewTaskName] = useState(name);

  const [isEditing, setIsEditing] = useState(false);
  function handleCheck() {
    if (!isEditing) {
      setIsChecked((prev) => !prev);
    }
  }
  function handleEdit() {
    setIsEditing(true);
  }
  function handleRemove() {
    // const filtered =
    const removeItem = {
      type: "Task",
      id: id,
    };
    window.bridge.removeData(removeItem);

    setTasks((prev: Task[]) => [...prev.filter((task) => task.id !== id)]);
  }
  function handleCancel() {
    setIsEditing(false);
    setNewTaskName(taskName);
  }
  function handleConfirm() {
    setTaskName(newTaskName);
    const itemEdit = {
      type: "Tasks",
      id: id,
      itemName: newTaskName,
      isCompleted: isChecked,
      //is daily, is completed
    };
    window.bridge.editData(itemEdit);

    setIsEditing(false);
  }

  useEffect(() => {
    const itemEdit = {
      type: "Tasks",
      id: id,
      itemName: newTaskName,
      isCompleted: isChecked,
      //is daily, is completed
    };
    window.bridge.editData(itemEdit);
  }, [isChecked]);

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
      <div
        className={`input-wrap ${isChecked ? "checked" : ""} ${
          isEditing ? "editing" : ""
        }`}
        onClick={handleCheck}
      >
        <input
          className={`check }`}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        {isEditing ? (
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        ) : (
          <label>{taskName}</label>
        )}
      </div>
      <div className="timer-options"></div>
      <div className="buttons-div">
        {isEditing ? (
          <>
            <button onClick={handleConfirm}>
              Confirm <Confirm />
            </button>
            <button onClick={handleCancel}>
              Cancel <Cancel />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>
              Edit <Edit />
            </button>
            <button onClick={handleRemove}>
              Remove <Delete />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
