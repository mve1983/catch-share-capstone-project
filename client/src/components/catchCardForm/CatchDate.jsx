import { useState } from "react";

export default function CatchDate({
  onHandleChangeString,
  catchCard,
}) {

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  return (
    <div className="form-div">
      <div>
        <label htmlFor="date">
          Datum: <br />
          <input
            type="date"
            id="date"
            name="date"
            onChange={onHandleChangeString}
            value={catchCard.date}
            min="2021-06-01"
            max={today}
          />
        </label>
      </div>
      <div>
        Tageszeit: <br />
        <label htmlFor="time">
          <select
            onChange={onHandleChangeString}
            id="time"
            name="time"
            value={catchCard.time}
          >
            <option value="morgens">morgens</option>
            <option value="mittags">mittags</option>
            <option value="abends">abends</option>
            <option value="nachts">nachts</option>
          </select>
        </label>
      </div>
    </div>
  );
}
