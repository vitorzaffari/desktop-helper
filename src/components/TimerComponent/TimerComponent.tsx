import { useState } from "react";
import "./TimerComponent.scss";
import TimerForm from "./TimerForm/TimerForm";
import TimerCard from "./TimerCard/TimerCard";
import Rice from "../../SvgComponents/Rice";
import Options from "../../SvgComponents/Options";

interface TimerItem {
  id: string;
  name: string;
  hour: number;
  minute: number;
  seconds: number;
}

const TimerConponent = () => {
  const [isTimerFormOpen, setIsTimerFormOpen] = useState(false);
  const [isTimerContainerOpen, setIsTimerContainerOpen] = useState(false);
  const [timers, setTimers] = useState<TimerItem[]>([]);

  function removeTimer(id: string) {
    setTimers((prevTimers) => prevTimers.filter((item) => item.id !== id));
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
        setIsTimerContainerOpen(!isTimerContainerOpen);
      }
    }
  }

  return (
    <div className={"timer-helper"}>
      <div className="timer-header" onClick={(e) => handleOpenContainer(e)}>
        <h1 className="timer-title">Timer</h1>
        <div className="timer-options">
          <button>
            Options <Options />
          </button>
          <button onClick={() => setIsTimerFormOpen(!isTimerFormOpen)}>
            Add <Rice />
          </button>
        </div>
      </div>

      <div className={`timer-form-wrapper ${isTimerFormOpen ? "open" : ""}`}>
        <TimerForm
          isTimerFormOpen={isTimerFormOpen}
          setTimers={setTimers}
          setIsTimerFormOpen={setIsTimerFormOpen}
          setIsTimerContainerOpen={setIsTimerContainerOpen}
        />
      </div>
      <div className={`items-wrapper ${isTimerContainerOpen ? "open" : ""}`}>
        <div className="items-inner-wrap">
          {timers.map((item) => (
            <TimerCard key={item.id} {...item} removeTimer={removeTimer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerConponent;
