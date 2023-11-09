import DailyTasks from "./components/DailyTasks/DailyTasks";
import Reminder from "./components/Reminders/Reminder";
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="reminders">
        <Reminder />
      </div>
      <div className="d-tasks">
        <DailyTasks />
      </div>
    </div>
  );
}

export default App;
