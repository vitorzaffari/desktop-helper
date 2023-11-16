import Check from "../../SvgComponents/Check";
import CheckCompleted from "../../SvgComponents/CheckCompleted";
import "./DailyTasksCard.css";
import { useEffect, useState } from "react";

interface DailyTask {
  id: string;
  itemName: string;
  seconds: number | null;
}

interface DailyTasksCardProps {
  id: string;
  itemName: string;
  seconds: number | null;
  setAllDailyTasks: Function;
  allDailyTasks: DailyTask[];
}

const DailyTasksCard: React.FC<DailyTasksCardProps> = ({
  id,
  itemName,
  seconds,
  setAllDailyTasks,
  allDailyTasks,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState<number | null>(seconds);
  const [isEditing, setIsEditing] = useState(false);
  const [isInfoDivOpen, setInfoDivOpen] = useState(false);
  const [isConfirmDeleteDivOpen, setIsConfirmDeleteDivOpen] = useState(false);
  const [currentTimer, setCurrentTimer] = useState({
    currentHours: 0,
    currentMinutes: 0,
    currentSeconds: 0,
  });

  function handleCheck() {
    isEditing ? null : setIsFinished(!isFinished);
  }
  // let hours = 0;
  // let minutes = 0;
  // let seconds2 = 0;
  // if (seconds != null) {
  //   hours = Math.floor(seconds / 3600);
  //   seconds -= hours * 3600;
  //   minutes = Math.floor(seconds / 60);
  //   seconds -= minutes * 60;
  //   seconds2 = seconds;
  // }
  const [timerDisplay, setTimerDisplay] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [editInputs, setEditInputs] = useState({
    editName: itemName,
    editHour: currentTimer.currentHours > 0 ? currentTimer.currentHours : null,
    editMinute:
      currentTimer.currentMinutes > 0 ? currentTimer.currentMinutes : null,
    editSecond:
      currentTimer.currentSeconds > 0 ? currentTimer.currentSeconds : null,
  });

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsConfirmDeleteDivOpen(false);
    const targetElement = e.target as HTMLDivElement;
    if (targetElement.id) {
      return;
    } else {
      const parentElement = targetElement.parentElement;

      if (parentElement && parentElement.id) {
        return;
      } else {
        isEditing == false ? setInfoDivOpen(!isInfoDivOpen) : null;
      }
    }
  }

  function handleStartTimer() {
    setIsPlaying(true);
  }
  function handleConfirmEdit() {
    let addAll = 0;
    if (editInputs.editHour != null && editInputs.editHour > 0) {
      addAll = editInputs.editHour * 3600;
    }
    if (editInputs.editMinute != null && editInputs.editMinute > 0) {
      addAll += editInputs.editMinute * 60;
    }
    if (editInputs.editSecond != null && editInputs.editSecond > 0) {
      addAll += editInputs.editSecond;
    }
    let newHours = 0;
    let newMinutes = 0;
    let newSeconds = 0;
    let resto = addAll;
    setTimer(addAll);
    if (resto != null) {
      newHours = Math.floor(resto / 3600);
      resto -= newHours * 3600;
      newMinutes = Math.floor(resto / 60);
      resto -= newMinutes * 60;
      newSeconds = resto;
    }
    const time = `${newHours < 10 ? `0${newHours}` : `${newHours}`}:${
      newMinutes < 10 ? `0${newMinutes}` : `${newMinutes}`
    }:${newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`}`;

    setDisplayTimer(addAll != null && addAll != 0 ? time : "");
    //!!Remover no futuro
    setTimerDisplay({
      hours: newHours,
      minutes: newMinutes,
      seconds: newSeconds,
    });
    setCurrentTimer({
      currentHours: newHours,
      currentMinutes: newMinutes,
      currentSeconds: newSeconds,
    });

    setIsEditing(false);
  }
  function handleEditTask() {
    console.log("Editing timer");
    setIsEditing(!isEditing);
    // setIsPlaying(false)
  }

  function handleRemoveTask() {
    console.log("Confirming remove timer");
    setIsConfirmDeleteDivOpen(true);
  }
  function handleConfirmRemoveTask() {
    console.log("Removing timer");
    setAllDailyTasks((prev: DailyTask[]) =>
      prev.filter((item) => item.id != id)
    );
  }
  function handleCancelEdit() {
    setIsEditing(false);
    setEditInputs({
      editName: itemName,
      editHour:
        currentTimer.currentHours > 0 ? currentTimer.currentHours : null,
      editMinute:
        currentTimer.currentMinutes > 0 ? currentTimer.currentMinutes : null,
      editSecond:
        currentTimer.currentSeconds > 0 ? currentTimer.currentSeconds : null,
    });
  }

  function handleFocusTask() {
    console.log("Focusing timer");
  }

  const time = `${
    timerDisplay.hours < 10 ? `0${timerDisplay.hours}` : `${timerDisplay.hours}`
  }:${
    timerDisplay.minutes < 10
      ? `0${timerDisplay.minutes}`
      : `${timerDisplay.minutes}`
  }:${
    timerDisplay.seconds < 10
      ? `0${timerDisplay.seconds}`
      : `${timerDisplay.seconds}`
  }`;
  const [displayTimer, setDisplayTimer] = useState(seconds != null ? time : "");

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    let newSeconds = 0,
      newMinute = 0,
      newHour = 0;
    newSeconds = timerDisplay.seconds;
    newMinute = timerDisplay.minutes;
    newHour = timerDisplay.hours;
    if(newSeconds == 0 && newMinute == 0 && newHour == 0){
      newSeconds = currentTimer.currentSeconds + 1;
    newMinute = currentTimer.currentMinutes;
    newHour = currentTimer.currentHours;
    }
    const updateTimer = () => {
      if (isEditing) {
        clearInterval(timerInterval);
        setIsPlaying(false)

        return;
      }
      // console.log(newSeconds, newMinute, newHour);
      if (newSeconds <= 0 && newMinute <= 0 && newHour <= 0) {
        clearInterval(timerInterval);
        console.log("Finished");
        console.log(newHour)

        setIsPlaying(false)

      } else if (newSeconds === 0) {
        if (newMinute === 0) {
          newHour -= 1;
          newMinute = 59;
        } else {
          newMinute -= 1;
        }
        newSeconds = 59;
      } else {
        newSeconds -= 1;
      }
      // console.log(newHour, newMinute, newSeconds);
      setTimerDisplay({
        hours: newHour,
        minutes: newMinute,
        seconds: newSeconds,
      });
    };
    if (isPlaying) {
      timerInterval = setInterval(updateTimer, 1000);
    }
    // if (!isPaused) {
    //   timerInterval = setInterval(updateTimer, 1000);

    //   if (timer.hour === 0 && timer.minute === 0 && timer.seconds === 0) {
    //     clearInterval(timerInterval);
    //     if(audioRef.current){
    //       audioRef.current.play()
    //     }
    //   }
    // }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isPlaying, isEditing]);

  useEffect(() => {
    let hours = 0;
    let minutes = 0;
    let seconds2 = 0;
    if (seconds != null) {
      hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      seconds2 = seconds;
    }
    setCurrentTimer({
      currentHours: hours,
      currentMinutes: minutes,
      currentSeconds: seconds2,
    });

    //!!Remover no futuro ou não
    setTimerDisplay({
      hours: hours,
      minutes: minutes,
      seconds: seconds2,
    });
    setEditInputs({
      editName: itemName,
      editHour: hours > 0 ? hours : null,
      editMinute: minutes > 0 ? minutes : null,
      editSecond: seconds2 > 0 ? seconds2 : null,
    });
  }, []);

  useEffect(() => {
    console.log(currentTimer);
  }, [currentTimer]);

  return (
    <div
      className={`task-card  ${isFinished ? "finished" : ""} ${
        isEditing ? "editing" : ""
      }`}
    >
      <div className={`top`} onClick={(e) => handleClick(e)}>
        <div className="name">
          <button
            onClick={handleCheck}
            className={`check-btn ${isEditing ? "editing" : ""}`}
            id="block"
          >
            {isFinished ? <CheckCompleted /> : <Check />}
          </button>
          {isEditing ? (
            <input
              type="text"
              className="name-input"
              onChange={(e) =>
                setEditInputs((prev) => ({ ...prev, editName: e.target.value }))
              }
              value={editInputs.editName}
            />
          ) : (
            <p className="item-name">{itemName}</p>
          )}
        </div>

        {isEditing ? (
          ""
        ) : (
          <div className={`display ${!displayTimer ? "empty" : ""}`}>
            <div className="display-text">
              <p>
                {timerDisplay.hours > 0 && timerDisplay.hours != null
                  ? timerDisplay.hours < 10
                    ? `0${timerDisplay.hours}`
                    : timerDisplay.hours
                  : "00"}
              </p>
              <span>:</span>
              <p>
                {timerDisplay.minutes > 0 && timerDisplay.minutes != null
                  ? timerDisplay.minutes < 10
                    ? `0${timerDisplay.minutes}`
                    : timerDisplay.minutes
                  : "00"}
              </p>
              <span>:</span>
              <p>
                {timerDisplay.seconds > 0 && timerDisplay.seconds != null
                  ? timerDisplay.seconds < 10
                    ? `0${timerDisplay.seconds}`
                    : timerDisplay.seconds
                  : "00"}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={`bottom ${isInfoDivOpen ? "open" : ""}`}>
        {isEditing ? (
          <div className="edit-options">
            <div className="new-time-inputs">
              <input
                type="number"
                name="editHour"
                id="editHour"
                className="timer-input"
                min={0}
                placeholder="hh"
                onChange={(e) =>
                  setEditInputs((prev) => ({
                    ...prev,
                    editHour: parseInt(e.target.value),
                  }))
                }
                value={
                  editInputs.editHour != null && editInputs.editHour != 0
                    ? editInputs.editHour
                    : ""
                }
              />
              <input
                type="number"
                name="minute"
                id="minute"
                className="timer-input"
                min={0}
                placeholder="mm"
                onChange={(e) =>
                  setEditInputs((prev) => ({
                    ...prev,
                    editMinute: parseInt(e.target.value),
                  }))
                }
                value={
                  editInputs.editMinute != null && editInputs.editMinute != 0
                    ? editInputs.editMinute
                    : ""
                }
              />
              <input
                type="number"
                name="second"
                id="second"
                className="timer-input "
                min={0}
                placeholder="ss"
                onChange={(e) =>
                  setEditInputs((prev) => ({
                    ...prev,
                    editSecond: parseInt(e.target.value),
                  }))
                }
                value={
                  editInputs.editSecond != null && editInputs.editSecond != 0
                    ? editInputs.editSecond
                    : ""
                }
              />
            </div>
            <div className="edit-btns">
              <button onClick={handleConfirmEdit}>Confirm</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="options">
            {isPlaying ? (
              <button onClick={() => setIsPlaying(false)}>Pause timer</button>
            ) : (
              <button
                disabled={seconds == null && timer == null ? true : false}
                className={timer != null && timer != 0 ? "" : "disable"}
                onClick={handleStartTimer}
              >
                Start timer
              </button>
            )}
            <button onClick={handleEditTask}>Edit</button>
            <button onClick={handleRemoveTask}>Remove</button>
            <button onClick={handleFocusTask}>Focus</button>
          </div>
        )}
        <div
          className={`confirm-delete-div ${
            isConfirmDeleteDivOpen ? "open" : ""
          }`}
        >
          <div className="inner">
            <p>Delete this task?</p>
            <div>
              <button onClick={handleConfirmRemoveTask}>Confirm</button>
              <button onClick={() => setIsConfirmDeleteDivOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTasksCard;
