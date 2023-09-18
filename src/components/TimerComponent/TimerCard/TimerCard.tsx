import { useEffect, useState } from "react";
import "./TimerCard.scss";

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
  const [timer, setTimer] = useState({
    hour,
    minute,
    seconds,
  });

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    const updateTimer = () => {
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
      if (newHour === 0 && newMinute === 0 && newSeconds === 0) {
        clearInterval(timerInterval);
        
        return
      }
      setTimer({
        hour: newHour,
        minute: newMinute,
        seconds: newSeconds,
      });
    };

    timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);


  const formattedTimer = `${timer.hour.toString().padStart(2, '0')}:${timer.minute.toString().padStart(2, '0')}:${timer.seconds.toString().padStart(2, '0')}`

  return (
    <div className="timer-card">
      <div className="top">
        <p>{name}</p>
      </div>
      <div className="bottom">
        <p>{formattedTimer}</p>
      </div>
      <div className="option-btns">
        <button>Edit</button>
        <button>Delete</button>
        <button>Pause</button>
        <button name="Repeat">Repeat</button>
      </div>
    </div>
  );
};

export default TimerCard;
