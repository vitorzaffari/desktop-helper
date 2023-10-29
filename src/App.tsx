import DatesComponent from "./components/DatesComponent/DatesComponent";
import Reminder from "./components/Reminders/Reminder";
import Sidebar from "./components/Sidebar/Sidebar";
import TasksComponents from "./components/TasksComponent/TasksComponents";
import TimerConponent from "./components/TimerComponent/TimerComponent";

function App() {
  return (
    <div className="app">
      <div className="reminders">
        <Reminder />
      </div>
    </div>
  );
}

export default App;
