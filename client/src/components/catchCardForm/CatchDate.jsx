import { dates } from "../../lib/catchFormArrays.js";

export default function CatchDate({ catchDate, onHandleChangeDate }) {
  const monthHandle = parseInt(catchDate.substring(6, 8)) - 1;
  const valueMonth = dates.months[monthHandle];

  return (
    <div className="form-div">
      <label htmlFor="day">
        Tag:
        <div>
          <select
            onChange={onHandleChangeDate}
            id="day"
            name="day"
            value={catchDate.substring(8, 10)}
          >
            {dates.days.map((day, _index) => (
              <option key={_index} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label htmlFor="month">
        Monat:
        <div>
          <select
            onChange={onHandleChangeDate}
            id="month"
            name="month"
            value={valueMonth}
          >
            {dates.months.map((month, _index) => (
              <option key={_index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label htmlFor="year">
        Jahr:
        <div>
          <select
            onChange={onHandleChangeDate}
            id="year"
            name="year"
            value={catchDate.substring(0, 4)}
          >
            {dates.years.map((year, _index) => (
              <option key={_index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label htmlFor="time">
        Zeit:
        <div>
          <select
            onChange={onHandleChangeDate}
            id="time"
            name="time"
            value={catchDate.substring(11, 16)}
          >
            {dates.times.map((time, _index) => (
              <option key={_index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </label>
    </div>
  );
}
