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

  return (
    <div
      className={"timer-helper"}
      
    >
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
        <TimerForm isTimerFormOpen={isTimerFormOpen} setTimers={setTimers}/>
      </div>
      <div>
        <div className="items-wrapper">
          {timers.map(item => (
            <TimerCard key={item.id} {...item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerConponent;
