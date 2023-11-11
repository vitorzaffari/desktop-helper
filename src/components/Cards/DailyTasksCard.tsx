import Check from "../../SvgComponents/Check";
import CheckCompleted from "../../SvgComponents/CheckCompleted";
import Menu from "../../SvgComponents/Menu";
import Play from "../../SvgComponents/Play";
import "./DailyTasksCard.css";
import { useState } from "react";

interface DailyTasksCardProps {
  id: string;
  itemName: string;
  seconds: number | null;
}

const DailyTasksCard: React.FC<DailyTasksCardProps> = ({
  id,
  itemName,
  seconds,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInfoDivOpen, setInfoDivOpen] = useState(false);

  function handleCheck() {
    setIsFinished(!isFinished);
  }
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
  const [timerDisplay, setTimerDisplay] = useState({
    hours,
    minutes,
    seconds2,
  });

function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
  const targetElement = e.target as HTMLDivElement;
  if (targetElement.id) {
    console.log(targetElement.id);
    return;
  } else {
    // If the target element doesn't have an id, check its parent
    const parentElement = targetElement.parentElement;

    // Check if the parent element exists and has an id
    if (parentElement && parentElement.id) {
      console.log(parentElement.id);
      return;
    } else {
      console.log("Neither the target nor its parent has an id.");
      setInfoDivOpen(!isInfoDivOpen)
    }
  }
}

function handleStartTimer(){
  console.log('Starting timer')
}


function handleEditTask(){
  console.log('Editing timer')
}


function handleRemoveTask(){
  console.log('Removing timer')
}


function handleFocusTask(){
  console.log('Focusing timer')
}




  const time = `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }:${seconds2 < 10 ? `0${seconds2}` : `${seconds2}`}`;
  const displayTimer = seconds != null ? time : "";
  // console.log(props)
  return (

    
    <div className={`task-card  ${isFinished ? "finished" : ""}`} >
      <div className={`top`} onClick={(e) => handleClick(e)}>
        <div className="name">
          <button onClick={handleCheck} className="check-btn" id="block">
            {isFinished ? <CheckCompleted /> : <Check />}
          </button>
          <p className="item-name">{itemName}</p>
        </div>
        {!displayTimer ? (
          ""
        ) : (
          <div className="display">
            {isFinished ? (
              <p style={{ fontWeight: 200 }}>Finished</p>
            ) : (
              <div className="display-text">
                {displayTimer}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`bottom ${isInfoDivOpen ? 'open' : ''}`}> 
        <div className="options">
          <button onClick={handleStartTimer}>Start timer</button>
          <button onClick={handleEditTask}>Edit</button>
          <button onClick={handleRemoveTask}>Remove</button>
          <button onClick={handleFocusTask}>Focus</button>
        </div>
      </div> 
    </div>
  );
};

export default DailyTasksCard;
