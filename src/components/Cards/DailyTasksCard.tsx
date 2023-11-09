import Check from "../../SvgComponents/Check";
import CheckCompleted from "../../SvgComponents/CheckCompleted";
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

  function handleCheck() {
    setIsFinished(!isFinished);
  }
  let hours = 0 
  let minutes = 0
  let seconds2 = 0
  if(seconds!=null){
    hours=Math.floor(seconds/3600)
    seconds -= hours*3600
    minutes = Math.floor(seconds/60)
    seconds -= minutes*60
    seconds2 = seconds
  }
  const [timerDisplay, setTimerDisplay] = useState({
    hours,
    minutes,
    seconds2
  }) 

  const time = `${hours < 10 ? `0${hours}`: `${hours}`}:${minutes < 10 ? `0${minutes}`: `${minutes}`}:${seconds2 < 10 ? `0${seconds2}`: `${seconds2}`}`
  const displayTimer = seconds!=null?time:''
  // console.log(props)
  return (
    <div className={`task-card  ${isFinished ? 'finished' : ''}`}>
      <div className={`top`}>
        <button onClick={handleCheck} className="check-btn">
          {isFinished ? <CheckCompleted /> : <Check />}
        </button>
        <p className="item-name">{itemName}</p>
        <div className="display">
          <p className="display-text">{isFinished ? 'Finished': displayTimer}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyTasksCard;
