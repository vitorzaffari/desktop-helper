import { useEffect, useState, ChangeEvent } from "react";
import "./TimerCard.scss";
import Edit from "../../../SvgComponents/Edit";
import Delete from "../../../SvgComponents/Delete";
import Pause from "../../../SvgComponents/Pause";
import Repeat from "../../../SvgComponents/Repeat";
import Confirm from "../../../SvgComponents/Confirm";
import Cancel from "../../../SvgComponents/Cancel";

interface TimerItem {
  id: string;
  name: string;
  hour: number;
  minute: number;
  seconds: number;
  removeTimer: Function;
}
const TimerCard: React.FC<TimerItem> = ({
  id,
  name,
  hour,
  minute,
  seconds,
  removeTimer,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTimerValues, setNewTimerValues] = useState({
    hour,
    minute,
    seconds,
  })
  const [itemName, setItemName] = useState(name);
  const [newItemName, setNewItemName] = useState(name)
  const [timer, setTimer] = useState({
    hour,
    minute,
    seconds,
  });

  function handleEditTimer(e: ChangeEvent<HTMLInputElement>) {
    setNewTimerValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleConfirmEdit(){
    setTimer(newTimerValues)

    setIsEditing(false)
    setIsPaused(false)
  }
  function handleCancelEdit(){
    setIsEditing(false)
    setIsPaused(false)
    setNewItemName(itemName)
  }
  function handleEdit(){
    setIsEditing(true)
    setNewTimerValues(timer)
  }

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    const updateTimer = () => {

      if (isPaused) {
        clearInterval(timerInterval);
        return;
      }
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

  useEffect(() => {
    if(isEditing){
      setIsPaused(true)
    }
  }, [isEditing]);

  const formattedTimer = `${timer.hour
    .toString()
    .padStart(2, "0")}:${timer.minute
    .toString()
    .padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`;

  return (
    <div className="timer-card">
      <div className="top">
        {isEditing ? (
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
        ) : (
          <p>{newItemName}</p>
        )}
      </div>
      <div className="bottom">
        {isEditing ? (
          <div className="edit-timer-inputs">
            <input
              type="number"
              name="hour"
              id="hour"
              min={0}
              value={newTimerValues.hour}
              onChange={(e) => handleEditTimer(e)}
            />
            <input
              type="number"
              name="minute"
              id="minute"
              min={0}
              value={newTimerValues.minute}
              onChange={(e) => handleEditTimer(e)}
            />
            <input
              type="number"
              name="seconds"
              id="seconds"
              min={0}
              value={newTimerValues.seconds}
              onChange={(e) => handleEditTimer(e)}
            />
          </div>
        ) : (
          <p>{formattedTimer}</p>
        )}
      </div>
      <div className="option-btns">
        {isEditing ? (
          <>
            <button title="Confirm" onClick={handleConfirmEdit}>
              <Confirm />
            </button>
            <button title="Cancel" onClick={handleCancelEdit}>
              <Cancel width={12} height={12} />
            </button>
          </>
        ) : (
          <>
            <button title="Edit" onClick={handleEdit}>
              <Edit />
            </button>
            <button title="Delete" onClick={() => removeTimer(id)}>
              <Delete />
            </button>
            <button title="Pause" onClick={() => setIsPaused(!isPaused)}>
              <Pause />
            </button>
            <button
              title="Repeat"
              onClick={() => setTimer(newTimerValues)}
            >
              <Repeat />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerCard;
