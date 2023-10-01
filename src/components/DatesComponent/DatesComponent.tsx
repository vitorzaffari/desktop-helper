import DateForm from "./DateForm/DateForm";
import "./DatesComponent.scss";
import { useState, useEffect } from "react";
import ItemCard from "./ItemCard/ItemCard";
import Options from "../../SvgComponents/Options";
import Rice from "../../SvgComponents/Rice";

interface DataItem {
  id: number;
  itemName: string;
  itemDate: string;
}

const DatesComponent = () => {
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const [isDateFormOpen, setIsDateFormOpen] = useState(false)
  let containerHeight: Number = 0;
  const [data, setData] = useState([]);

  function handleOpenForm() {
    // opens the form and the container if container is closed
    // setIsContainerOpen(true);
    setIsDateFormOpen(!isDateFormOpen);
  }

  function handleOpenContainer(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    //opens the container if clicked on the header but not on the header buttons

    if (e.target instanceof Element) {
      const tagName = e.target.tagName;
      // console.log(`Clicked element tag name: ${tagName}`);
      if (tagName === "BUTTON" || tagName === "svg" || tagName === "path") {
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
    const temp = document.querySelector('.items-wrapper')
    if(temp){
      containerHeight = temp.getBoundingClientRect().height
    }

  }, []);



  return (
    <div className="dates-helper">
      <div className="dates-header" onClick={(e) => handleOpenContainer(e)}>
        <h1 className="dates-title">Dates Helper</h1>
        <div className="dates-options">
          <button>Options <Options /></button>
          <button onClick={handleOpenForm}>Add <Rice /></button>
        </div>
      </div>

      <div className={`dates-form-wrapper ${isDateFormOpen? 'open' : ''}`} >
        <DateForm
          isDateFormOpen={isDateFormOpen}
          setIsDateFormOpen={setIsDateFormOpen}
          setData={setData}
          setIsContainerOpen={setIsContainerOpen}
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
