import "./ItemCard.scss";
import { ItemData } from "../../../Utilities/bridge";
import { useState } from "react";
import Calendar from "../../../SvgComponents/Calendar";
import Rice from "../../../SvgComponents/Rice";
import Flag from "../../../SvgComponents/Flag";
import Edit from "../../../SvgComponents/Edit";
import Cancel from "../../../SvgComponents/Cancel";
import Delete from "../../../SvgComponents/Delete";
import Confirm from "../../../SvgComponents/Confirm";

interface ItemCardProps {
  name: string;
  date: string;
  id: number;
  setData: Function;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, date, id, setData }) => {
  const [initialValues, setInitialValues] = useState({
    name: name,
    date: date,
    day: "",
    month: "",
    year: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [day, month, year] = date.split("/");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [newValues, setNewValues] = useState({
    name: name,
    day: day,
    month: month,
    year: year,
  });
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [remainingText, remaningColor] = calculateRemain();

  function handleRemove(itemId: number) {
    window.bridge.removeData(itemId);

    setData((prev: ItemData[]) =>
      prev.filter((item) => item.id !== itemId.toString())
    );
    setIsConfirmDeleteOpen(false);
  }
  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function handleChange<T extends HTMLInputElement>(e: React.ChangeEvent<T>) {
    setNewValues((itemData) => ({
      ...itemData,
      [e.target.id]: e.target.value,
    }));
  }

  function handleConfirm() {
    const newItem: ItemData = {
      id: id.toString(),
      itemDate: `${newValues.day}/${newValues.month}/${newValues.year}`,
      itemName: newValues.name,
    };
    window.bridge.editData(newItem);
    console.log("Finish Edit!");
    setInitialValues({
      name: newValues.name,
      date: `${newValues.day}/${newValues.month}/${newValues.year}`,
      day: newValues.day,
      month: newValues.month,
      year: newValues.year,
    });
    setIsEditing(false);
  }

  function calculateRemain() {
    const dateNow = new Date();
    const [futureDay, futureMonth, futureYear] = initialValues.date
      .split("/")
      .map(Number);
    const futureDate = new Date(futureYear, futureMonth - 1, futureDay);
    const currentMonth = currentDate.getMonth() + 1;
    // console.log(currentMonth)
    const timeDifference = futureDate.getTime() - dateNow.getTime();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInMonth = millisecondsInDay * 30;
    const millisecondsInYear = millisecondsInDay * 30 * 12;
    const remainingYears = (timeDifference / millisecondsInYear) >> 0;
    const remainingMonths =
      ((timeDifference % millisecondsInYear) / millisecondsInMonth) >> 0;
    const remainingDays =
      (((timeDifference % millisecondsInYear) % millisecondsInMonth) /
        millisecondsInDay) >>
      0;

    if (timeDifference < 0) {
      return ["Expired", "red"];
    } else if (
      remainingYears === 0 &&
      remainingMonths === 0 &&
      remainingDays < 2
    ) {
      return [`In 1 day`, "#f88888"];
    } else if (
      remainingYears === 0 &&
      remainingMonths === 0 &&
      remainingDays <= 7
    ) {
      return [`In ${remainingDays + 1} days`, "#f88888"];
    } else if (
      remainingYears === 0 &&
      remainingMonths === 0 &&
      currentMonth === futureMonth
    ) {
      return [`In ${remainingDays} days`, "#f7f594"];
    } else if (
      (remainingYears === 0 &&
        remainingMonths === 0 &&
        currentMonth < futureMonth) ||
      (remainingYears === 0 &&
        remainingMonths === 1 &&
        currentMonth + 1 == futureMonth)
    ) {
      return ["Next month", "#b8f794"];
    } else if (remainingYears === 0 && remainingMonths === 1) {
      return [`In two months`, "#a5f379"];
    } else if (remainingYears === 0 && remainingMonths > 1) {
      return [`In ${remainingMonths} months`, "#a5f379"];
    } else if (remainingYears === 1 && remainingMonths === 0) {
      return ["In one year", "#65d9e9"];
    } else if (remainingYears === 1 && remainingMonths > 1) {
      return [`In one year and ${remainingMonths} months`, "#65d9e9"];
    } else if (remainingYears >= 2) {
      return [`In ${remainingYears} years`, "#0daef8"];
    } else {
      return ["", ""];
    }
  }

  return (
    <div className="item-card">
      <div className="top">
        <div className="item-name-date-div">
          {isEditing ? (
            <input
              type="text"
              id="name"
              placeholder="Editing name"
              onChange={(e) => handleChange(e)}
              value={newValues.name}
            />
          ) : (
            <div className="icon-text-div">
              <Rice /> <p>{initialValues.name}</p>
            </div>
          )}
          {isEditing ? (
            <div>
              <input
                type="number"
                min={1}
                max={31}
                id="day"
                placeholder="Day"
                onChange={(e) => handleChange(e)}
                value={newValues.day}
              />
              <input
                type="number"
                min={1}
                max={12}
                id="month"
                placeholder="Month"
                onChange={(e) => handleChange(e)}
                value={newValues.month}
              />
              <input
                type="number"
                min={currentYear}
                id="year"
                placeholder="Year"
                onChange={(e) => handleChange(e)}
                value={newValues.year}
              />
            </div>
          ) : (
            <div className="icon-text-div">
              <Calendar /> <p>{initialValues.date}</p>
            </div>
          )}
        </div>

        <div className="card-options">
          {isEditing ? (
            <>
              <button onClick={handleConfirm}>
                <Confirm width={24} height={22} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewValues({
                    name: initialValues.name,
                    day: initialValues.day,
                    month: initialValues.month,
                    year: initialValues.year,
                  });
                }}
              >
                <Cancel />
              </button>
            </>
          ) : (
            <>
              <button title="Edit" onClick={handleEdit}>
                <Edit width={20} height={20} />
              </button>
              <button
                title="Delete"
                onClick={() => setIsConfirmDeleteOpen(true)}
              >
                <Delete width={18} height={18} />
              </button>
              <div className={`confirm-delete-div ${isConfirmDeleteOpen ? 'open' : ''}`}>
                <p>Remove this item?</p>
                <div className="options">
                  <button onClick={() => handleRemove(id)}>Yes</button>
                  <button onClick={() => setIsConfirmDeleteOpen(false)}>No</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bottom">
        <div className="icon-text-div">
          <Flag /> <p>{remainingText}</p>
        </div>
        <span
          className="color-indicator"
          style={{ backgroundColor: remaningColor }}
        ></span>
      </div>
    </div>
  );
};

export default ItemCard;
