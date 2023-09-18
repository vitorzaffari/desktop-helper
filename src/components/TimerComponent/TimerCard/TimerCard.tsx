import { useEffect, useState } from "react";
import "./TimerCard.scss";
import Edit from "../../../SvgComponents/Edit";
import Delete from "../../../SvgComponents/Delete";
import Pause from "../../../SvgComponents/Pause";
import Repeat from "../../../SvgComponents/Repeat";

interface TimerItem {
  id: string;
  name: string;
  hour: number;
  minute: number;
  seconds: number;
}
const TimerCard: React.FC<TimerItem> = ({
  id,
  name,
  hour,
  minute,
  seconds,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState({
    hour,
    minute,
    seconds,
  });

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    const updateTimer = () => {
      if (isPaused) {
        clearInterval(timerInterval);
        return;
      }
      console.log(isPaused);
      let newSeconds = timer.seconds - 1;
      let newMinute = timer.minute;
      let newHour = timer.hour;

      if (newSeconds < 0) {
        newSeconds = 59;
        newMinute -= 1;
      }
      if (newMinute < 0) {
        newMinute = 59;
        newHour -= 1;
      }

      setTimer({
        hour: newHour,
        minute: newMinute,
        seconds: newSeconds,
      });
    };
    if (!isPaused) {
      timerInterval = setInterval(updateTimer, 1000);

      if (timer.hour === 0 && timer.minute === 0 && timer.seconds === 0) {
        clearInterval(timerInterval);
        console.log("Finished!");
      }
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, isPaused]);

  const formattedTimer = `${timer.hour
    .toString()
    .padStart(2, "0")}:${timer.minute
    .toString()
    .padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`;

  return (
    <div className="timer-card">
      <div className="top">
        <p>{name}</p>
      </div>
      <div className="bottom">
        <p>{formattedTimer}</p>
      </div>
      <div className="option-btns">
        <button title="Edit">
          <Edit />
        </button>
        <button title="Delete">
          <Delete />
        </button>
        <button title="Pause" onClick={() => setIsPaused(!isPaused)}>
          <Pause />
        </button>
        <button
          title="Repeat"
          onClick={() => setTimer({ hour, minute, seconds })}
        >
          <Repeat />
        </button>
      </div>
    </div>
  );
};

export default TimerCard;
