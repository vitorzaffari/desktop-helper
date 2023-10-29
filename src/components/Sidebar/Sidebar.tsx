import { useEffect, useState } from "react";
import Menu from "../../SvgComponents/Menu";
import "./Sidebar.css";

interface OpenState {
  reminders: boolean;
  tasks: boolean;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState({
    reminders: false,
    tasks: false,
  });

  function openOptions(name: keyof OpenState) {
    setIsOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div className="sidebar-component">
      <div className="reminders">
        <div className="header">
          <button className="main-btn">Reminders</button>
          <button className="menu-btn" onClick={() => openOptions("reminders")}>
            <Menu />
          </button>
        </div>

        <div className={`options ${isOpen.reminders ? "open" : ""}`}>
          <button>dasdasdsa</button>
          <button>dasdasdsa</button>
          <button>dasdasdsa</button>
          <button>dasdasdsa</button>
        </div>
      </div>
      <div className="reminders">
        <div className="header">
          <button className="main-btn">Tasks</button>
          <button className="menu-btn" onClick={() => openOptions("tasks")}>
            <Menu />
          </button>
        </div>

        <div className={`options ${isOpen.tasks ? "open" : ""}`}>
          <button>dasdasdsa</button>
          <button>dasdasdsa</button>
          <button>dasdasdsa</button>
          <button>dasdasdsa</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
