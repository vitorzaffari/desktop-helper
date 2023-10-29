import { FC, useState } from "react";
import "./RemindersCard.css";
import { ItemData } from "../../Utilities/bridge";

interface CardProps {
  id: string;
  name: string;
  date: string;
  setReminders: Function;
}

const RemindersCard: React.FC<CardProps> = ({
  id,
  name,
  date,
  setReminders,
}) => {
  const [initialValues, setInitialValues] = useState({
    name: name,
    date: date,
    day: "",
    month: "",
    year: "",
  });
  const [isBottomOpen, setIsBottomOpen] = useState(false);
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

  function handleRemove(itemId: string) {
    const removeData = {
      type: "Reminders",
      id: itemId,
    };
    window.bridge.removeData(removeData);

    setReminders((prev: ItemData[]) =>
      prev.filter((item) => item.id !== itemId.toString())
    );
    setIsConfirmDeleteOpen(false);
  }

  //TODO-------------------------------------------------
  function handleEdit() {
    setIsEditing(!isEditing);
    console.log("Editing");
  }
  //TODO-------------------------------------------------

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
    //!!
    const totalDays = timeDifference / millisecondsInDay;

    if (timeDifference < 0) {
      return ["Expired", "red"];
    } else if (
      remainingYears === 0 &&
      remainingMonths === 0 &&
      remainingDays < 2
    ) {
      return [`1 day`, "#f88888"];
    } else if (
      remainingYears === 0 &&
      remainingMonths === 0 &&
      remainingDays <= 7
    ) {
      return [`${remainingDays + 1} days`, "#f88888"];
    } else if (
      remainingYears === 0 &&
      remainingMonths === 0 &&
      currentMonth === futureMonth
    ) {
      return [`${remainingDays} days`, "#f7f594"];
    } else if (
      (remainingYears === 0 &&
        remainingMonths === 0 &&
        currentMonth < futureMonth) ||
      (remainingYears === 0 &&
        remainingMonths === 1 &&
        currentMonth + 1 == futureMonth)
    ) {
      // return ["1 month", "#b8f794"];
      return [`${Math.floor(totalDays)} days`, "#b8f794"];
    } else if (remainingYears === 0 && remainingMonths === 1) {
      return [`2 months`, "#a5f379"];
    } else if (remainingYears === 0 && remainingMonths > 1) {
      return [`In ${remainingMonths} months`, "#a5f379"];
    } else if (remainingYears === 1 && remainingMonths === 0) {
      return ["One year", "#65d9e9"];
    } else if (remainingYears === 1 && remainingMonths > 1) {
      return [`One year and ${remainingMonths} months`, "#65d9e9"];
    } else if (remainingYears >= 2) {
      return [`${remainingYears} years`, "#0daef8"];
    } else {
      return ["", ""];
    }
  }

  function handleOpen() {
    setIsConfirmDeleteOpen(false);
    isEditing ? '' : setIsBottomOpen(!isBottomOpen);
  }

  return (
    <div className="reminder-card">
      <div
        className={`color-tag  ${isEditing ? "editing" : ""}`}
        style={{ backgroundColor: remaningColor }}
      ></div>
      <div className="top" onClick={handleOpen}>
        <div className="name">
          {isEditing ? (
            <input className="name-input" value={name} type="text" />
          ) : (
            <p>{name}</p>
          )}
        </div>
        {isEditing ? (
          ""
        ) : (
          <div className="date">
            <p>{remainingText}</p>
          </div>
        )}
      </div>
      <div className={`bottom ${isBottomOpen ? "open" : ""}`}>
        {isEditing ? (
          <>
            <div className="editing-date-inputs">
              <input
                className="date-input"
                type="number"
                name="day"
                id=""
                placeholder="dd"
                min={1}
                max={31}
                value={day}
              />
              <input
                className="date-input"
                type="number"
                name="month"
                id=""
                placeholder="mm"
                min={1}
                max={12}
                value={month}

              />
              <input
                className="date-input"
                type="number"
                name="year"
                id=""
                placeholder="yyyy"
                value={year}
                min={new Date().getFullYear()}
              />
            </div>
            <div className="edit-btns">
              <button className="confirm-btn">Confirm</button>
              <button className="cancel-btn" onClick={handleEdit}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="date">{date}</p>
            <div className="buttons">
              <div
                className={`confirm-delete ${
                  isConfirmDeleteOpen ? "open" : ""
                }`}
              >
                <p>Delete this item?</p>

                <div>
                  <button onClick={() => handleRemove(id)}>Confirm</button>
                  <button
                    onClick={() => setIsConfirmDeleteOpen(!isConfirmDeleteOpen)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <button
                className={`edit-btn ${isConfirmDeleteOpen ? "hide" : ""}`}
                disabled={isConfirmDeleteOpen}
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className={`cancel-btn ${isConfirmDeleteOpen ? "hide" : ""}`}
                onClick={() => setIsConfirmDeleteOpen(!isConfirmDeleteOpen)}
                disabled={isConfirmDeleteOpen}
              >
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RemindersCard;
