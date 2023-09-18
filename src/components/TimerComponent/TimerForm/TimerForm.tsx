import { useState } from "react";
import "./TimerForm.scss";
import { v4 as uuid } from "uuid";

interface TimerFormProps {
  isTimerFormOpen: boolean;
  setTimers: Function;
}

interface TimerItem {
  id: string;
  name: string;
  hour: number;
  minute: number;
  seconds: number;
}

const TimerForm: React.FC<TimerFormProps> = ({
  isTimerFormOpen,
  setTimers,
}) => {
  const [time, setTime] = useState({
    name: "",
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue;
    if (e.target.name != "name") {
      newValue = parseInt(e.target.value);
    } else newValue = e.target.value;

    setTime({ ...time, [e.target.name]: newValue });
  }
  function handleAddTimer() {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      return;
    }
    const item = {
      id: uuid(),
      name: time.name,
      hour: time.hours,
      minute: time.minutes,
      seconds: time.seconds,
    };
    setTimers((prev: TimerItem[]) => [...prev, item]);
  }

  return (
    <div className="timer-form">
      <div className="top">
        <h3>Add a new timer</h3>
      </div>
      <div className="bottom">
        <div className="input-wrap">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            min={0}
            value={time.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="number-inputs">
          <div className="input-wrap">
            <label htmlFor="hours">Hours</label>
            <input
              type="number"
              name="hours"
              id="hours"
              min={0}
              value={time.hours}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="minutes">Minutes</label>
            <input
              type="number"
              name="minutes"
              id="minutes"
              min={0}
              value={time.minutes}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="seconds">Seconds</label>
            <input
              type="number"
              name="seconds"
              id="seconds"
              min={0}
              value={time.seconds}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="add" onClick={handleAddTimer}>
          Confirm
        </button>
        <button className="cancel">Cancel</button>
      </div>
    </div>
  );
};

export default TimerForm;