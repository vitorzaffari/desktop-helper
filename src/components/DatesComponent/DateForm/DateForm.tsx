import "./DateForm.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemData } from "../../../Utilities/bridge";
import Confirm from "../../../SvgComponents/Confirm";
import Cancel from "../../../SvgComponents/Cancel";

interface DateFormProps {
  isDateFormOpen: boolean;
  setIsDateFormOpen: Function;
  setData: Function;
  setIsContainerOpen: Function;
}

const DateForm: React.FC<DateFormProps> = ({
  isDateFormOpen,
  setIsDateFormOpen,
  setData,
  setIsContainerOpen,
}) => {
  const [itemData, setItemData] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
  });
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  function handleInput<T extends HTMLInputElement>(e: React.ChangeEvent<T>) {
    setItemData((itemData) => ({ ...itemData, [e.target.id]: e.target.value }));
  }

  function handleSubmitData() {
    const uuid = uuidv4();

    for (let item of Object.values(itemData)) {
      if (item === "") {
        console.log(`Item must not be empty`);
        return;
      }
    }
    const item: ItemData = {
      id: uuid,
      itemDate: `${itemData.day}/${itemData.month}/${itemData.year}`,
      itemName: itemData.name,
    };
    window.bridge.sendData(item);
    setData((prev: ItemData[]) => [...prev, item]);
    console.log(item);

    setItemData({ name: "", day: "", month: "", year: "" });
    setIsContainerOpen(true)
    setIsDateFormOpen(false);
  }

  useEffect(() => {
    //dinamic height animation

    if (isDateFormOpen) {
      const formContainer: null | HTMLElement =
        document.querySelector(".date-form");
      const containerHeight = formContainer?.clientHeight;
      if (formContainer) {
        formContainer.style.height = `${containerHeight}px`;
      }
    }
  }, [isDateFormOpen]);

  return (
    <div className={`date-form ${isDateFormOpen ? "active" : ""}`}>
      <h3>Add a new item</h3>
      <div className="inputs">
        <div className="name-input-wrap">
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={(e) => handleInput(e)}
            value={itemData.name}
          />
        </div>
        <div className="date-number-inputs">
          <div className="input-wrap">
            {/* <label htmlFor="day">Day</label> */}
            <input
              type="number"
              placeholder="Day"
              id="day"
              min={1}
              max={31}
              onChange={(e) => handleInput(e)}
              value={itemData.day}
            />
          </div>

          <div className="input-wrap">
            {/* <label htmlFor="month">Month</label> */}
            <input
              type="number"
              placeholder="Month"
              id="month"
              min={1}
              max={12}
              onChange={(e) => handleInput(e)}
              value={itemData.month}
            />
          </div>

          <div className="input-wrap">
            {/* <label htmlFor="year">Year</label> */}
            <input
              type="number"
              id="year"
              placeholder="Year"
              min={currentYear}
              onChange={(e) => handleInput(e)}
              value={itemData.year}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="add" onClick={handleSubmitData}>
          <Confirm width={24} height={24}/>
        </button>
        <button
          className="add"
          onClick={() => {
            setIsDateFormOpen(false);
            setItemData({ name: "", day: "", month: "", year: "" });
          }}
        >
          <Cancel  height={24}/>
        </button>
      </div>
    </div>
  );
};

export default DateForm;
