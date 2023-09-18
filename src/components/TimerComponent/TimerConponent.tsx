import { useContext, useState } from "react";
import "./TimerComponent.scss";
import TimerForm from "./TimerForm/TimerForm";
import TimerCard from "./TimerCard/TimerCard";

interface TimerItem {
  id: string;
  name: string;
  hour: number;
  minute: number;
  seconds: number;
}

const TimerConponent = () => {
  const [isTimerFormOpen, setIsTimerFormOpen] = useState(false);
  const [timers, setTimers] = useState<TimerItem[]>([]);

  function removeTimer(id: string) {
    setTimers((prevTimers) => prevTimers.filter((item) => item.id !== id));
  }
  return (
    <div className={"timer-helper"}>
      <div className="timer-header">
        <h1 className="timer-title">Timer</h1>
        <div className="timer-options">
          <button>Options</button>
          <button onClick={() => setIsTimerFormOpen(!isTimerFormOpen)}>
            Add
          </button>
        </div>
      </div>

      <div className={`timer-form-wrapper ${isTimerFormOpen ? "open" : ""}`}>
        <TimerForm
          isTimerFormOpen={isTimerFormOpen}
          setTimers={setTimers}
          setIsTimerFormOpen={setIsTimerFormOpen}
        />
      </div>
      {/* <div> */}
      <div className="items-wrapper">
        {timers.map((item) => (
          <TimerCard key={item.id} {...item} removeTimer={removeTimer} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default TimerConponent;
