import { useEffect, useState } from "react";
import "./Reminders.css";
import RemindersCard from "../Cards/RemindersCard";
import { v4 as uuidv4 } from "uuid";

// mudar getFullYear direto no input de anos;

interface Reminder {
  id: string;
  itemName: string;
  itemDate: string;
}

const Reminder = () => {
  const [inputs, setInputs] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
  });
  const [reminders, setReminders] = useState<Reminder[]>([]);

function handleClearInputs(){
  setInputs({
    name: "",
    day: "",
    month: "",
    year: "",
  })
}

function handleSubmitData() {
  const uuid = uuidv4();

  const item: Reminder = {
    id: uuid,
    itemDate: `${inputs.day}/${inputs.month}/${inputs.year}`,
    itemName: inputs.name,
  };
  window.bridge.sendData(item);
  setReminders((prev: Reminder[]) => [...prev, item]);
  console.log(item);

  setInputs({ name: "", day: "", month: "", year: "" });
}








useEffect(() => {
  console.log(inputs)
}, [inputs])

  useEffect(() => {
    //gets the data from the json when first loaded
    const getRetrievedData = window.getData.getRetrievedData();
    if (getRetrievedData) {
      setReminders(getRetrievedData.datesTracker);
    }
  }, []);

  return (
    <section className="reminder">
      <div className="header">
        <div className="title">
          <h2>Reminders</h2>
        </div>
        <div className="form">
          {/* height 80px */}
          <input
            className="name-input"
            placeholder="Add new item"
            type="text"
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, name: e.target.value }))
            }
            value={inputs.name}

          />
          <div className="form-inputs">
            <input
              className="date-input"
              type="number"
              name="day"
              id=""
              placeholder="dd"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, day: e.target.value }))
              }
              min={1}
              max={31}
              value={inputs.day}

            />
            <input
              className="date-input"
              type="number"
              name="month"
              id=""
              placeholder="mm"
              min={1}
              max={12}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, month: e.target.value }))
              }
              value={inputs.month}

            />
            <input
              className="date-input"
              type="number"
              name="year"
              id=""
              placeholder="yyyy"
              min={new Date().getFullYear()}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, year: e.target.value }))
              }
              value={inputs.year}
            />
            <div className="buttons">
              <button onClick={handleClearInputs}>Clear</button>
              <button className="add-btn" onClick={handleSubmitData}>Add</button>
            </div>
          </div>
        </div>
      </div>
      <div className="reminders-container">
        {reminders.map((item) => (
          <RemindersCard key={item.id} 
          id={item.id} name={item.itemName} date={item.itemDate} setReminders={setReminders}/>
        ))}
      </div>
    </section>
  );
};

export default Reminder;
