import DateForm from "./DateForm/DateForm";
import "./DatesComponent.scss";
import { useState, useEffect } from "react";
import ItemCard from "./ItemCard/ItemCard";

interface DataItem {
  id: number;
  itemName: string;
  itemDate: string;
}

const DatesComponent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formHeight, setFormHeight] = useState(0);
  const [data, setData] = useState([]);

  function handleOpenForm() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    const getRetrievedData = window.getData.getRetrievedData();
    if (getRetrievedData) {
      setData(getRetrievedData.datesTracker);
    }
  }, []);
  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  return (
    <div className="dates-helper">
      <div className="dates-header">
        <h1 className="dates-title">Dates Helper</h1>
        <div className="dates-options">
          <button>Options</button>
          <button onClick={handleOpenForm}>Add</button>
        </div>
      </div>

      <div className="dates-form">
        <DateForm
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          setFormHeight={setFormHeight}
          setData={setData}
        />
      </div>
      <div
        className={`itens-container ${isFormOpen ? "push" : ""}`}
        style={isFormOpen ? { transform: `translateY(${formHeight}px)` } : {}}
      >
        <div className="itens-wrapper">
          {data.map((item: DataItem) => (
            <ItemCard key={item.id} name={item.itemName} date={item.itemDate} id={item.id} setData={setData}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatesComponent;
