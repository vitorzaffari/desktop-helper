import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./DailyTasks.css";
import DailyTasksCard from "../Cards/DailyTasksCard";

interface DailyTask {
  id: string;
  itemName: string;
  seconds: number | null;
}

const DailyTasks = () => {
  const [formInputs, setFormInputs] = useState({
    itemName: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const [allDailyTasks, setAllDailyTasks] = useState<DailyTask[]>([]);
  const inputNameRef = useRef<HTMLInputElement | null>(null);

  function clearInputs() {
    setFormInputs({
      itemName: "",
      hours: "",
      minutes: "",
      seconds: "",
    });
    if (inputNameRef.current) {
      inputNameRef.current.focus();
    }
  }

  function verify() {
    if (formInputs.itemName.trim().length == 0) {
      setFormInputs((prev) => ({ ...prev, itemName: "" }));
      if (inputNameRef.current) {
        inputNameRef.current.focus();
      }
      return false;
    }
    return true;
  }

  function handleAddTask() {
    let valid = verify();
    if (valid) {
      console.log("oof");
      let hour = formInputs.hours ? parseInt(formInputs.hours) : 0;
      let minute = formInputs.minutes ? parseInt(formInputs.minutes) : 0;
      let second = formInputs.seconds ? parseInt(formInputs.seconds) : 0;

      let hasTimer = hour + minute + second > 0;
      console.log(
        hour,
        minute,
        second
      );
      let itemSeconds = null;
      if (hasTimer) {
        console.log("has timer");
        itemSeconds =
        hour * 3600 +
        minute * 60 +
        second;
      }
      const uuid = uuidv4();
      let newItem: DailyTask = {
        id: uuid,
        itemName: formInputs.itemName,
        seconds: itemSeconds,
      };

      setAllDailyTasks((prev) => [...prev, newItem]);
      console.log("OK!");

      clearInputs()
    }
  }

  useEffect(() => {
    console.log(allDailyTasks);
  }, [allDailyTasks]);

  return (
    <div className="daily">
      <div className="header">
        <div className="title">
          <h2>Daily Tasks</h2>
        </div>
        <div className="form">
          {/* height 80px */}
          <input
            className="name-input"
            placeholder="Add new item"
            type="text"
            ref={inputNameRef}
            value={formInputs.itemName}
            onChange={(e) =>
              setFormInputs((prev) => ({ ...prev, itemName: e.target.value }))
            }
          />
          <div className="form-inputs">
            <input
              className="timer-input"
              type="number"
              min="0"
              name="hours"
              id="hours"
              placeholder="hh"
              value={formInputs.hours}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, hours: e.target.value }))
              }
            />
            <input
              className="timer-input"
              type="number"
              min="0"
              name="minutes"
              id="minutes"
              placeholder="mm"
              value={formInputs.minutes}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, minutes: e.target.value }))
              }
            />
            <input
              className="timer-input"
              type="number"
              min="0"
              name="seconds"
              id="seconds"
              placeholder="ss"
              value={formInputs.seconds}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, seconds: e.target.value }))
              }
            />
            <div className="buttons">
              <button onClick={clearInputs}>Clear</button>
              <button className="add-btn" onClick={handleAddTask}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="reminders-container">
        {allDailyTasks.map(task => (
          <DailyTasksCard key={task.id} id={task.id} itemName={task.itemName} seconds={task.seconds}/>
        ))}
      </div>
    </div>
  );
};

export default DailyTasks;
