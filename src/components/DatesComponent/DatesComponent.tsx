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
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const [dateFormHeight, setDateFormHeight] = useState(0);
  const [isDateFormOpen, setIsDateFormOpen] = useState(false)
  const [data, setData] = useState([]);

  function handleOpenForm() {
    // opens the form and the container if container is closed
    setIsContainerOpen(true);
    setIsDateFormOpen(!isDateFormOpen);
  }

  function handleOpenContainer(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    //opens the container if clicked on the header but not on the header buttons

    if (e.target instanceof Element) {
      const tagName = e.target.tagName;
      // console.log(`Clicked element tag name: ${tagName}`);
      if (tagName === "BUTTON") {
        return;
      } else {
        setIsContainerOpen(!isContainerOpen);
      }
    }
  }
  useEffect(() => {
    //gets the data from the json when first loaded
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
      <div className="dates-header" onClick={(e) => handleOpenContainer(e)}>
        <h1 className="dates-title">Dates Helper</h1>
        <div className="dates-options">
          <button>Options</button>
          <button onClick={handleOpenForm}>Add</button>
        </div>
      </div>

      <div className={`dates-form-wrapper ${isDateFormOpen? 'open' : ''}`}>
        <DateForm
          isDateFormOpen={isDateFormOpen}
          setIsDateFormOpen={setIsDateFormOpen}
          setDateFormHeight={setDateFormHeight}
          setData={setData}
        />
      </div>
      <div
        className={`items-container ${
          isContainerOpen ? "open" : ""
        }`}
      >
        <div className="items-wrapper">
          {data.map((item: DataItem) => (
            <ItemCard
              key={item.id}
              name={item.itemName}
              date={item.itemDate}
              id={item.id}
              setData={setData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatesComponent;