import { useState } from "react";
import styled from "styled-components";
import { fishtypes, dates, tackle } from "../../lib/catchFormArrays.js";
import PhotoPicker from "./FileUpload.jsx";

export default function CatchForm({
  catchCard,
  onHandleSubmit,
  onInputChange,
}) {

  const [catchDate, setCatchDate] = useState("2021-01-01T00:00:00") ;
  const monthHandle = parseInt(catchDate.substring(6,8)) - 1
  const valueMonth = dates.months[monthHandle]

  function handleChangeDate(event) {
    switch (event.target.name) {
      case "year":
       setCatchDate(event.target.value + catchDate.substring(4, catchDate.length ))
        break;
      case "month":
        let monthFinder = dates.months.indexOf(event.target.value) + 1;
        monthFinder > 9
          ? setCatchDate(catchDate.substring(0, 5) + monthFinder.toString() + catchDate.substring(7, catchDate.length))
          : setCatchDate(catchDate.substring(0, 5) + "0" + monthFinder.toString() + catchDate.substring(7, catchDate.length))
        break;
      case "day":
        setCatchDate(catchDate.substring(0,8) + event.target.value + catchDate.substring(10, catchDate.length))
        break;
      case "time":
        setCatchDate(catchDate.substring(0,11) + event.target.value + catchDate.substring(16, catchDate.length))
       break;
    }
    onInputChange("datetime", catchDate);
  }

  function handleChangeString(event) {
    onInputChange(event.target.name, event.target.value);
  }

  function handleChangeFloat(event) {
    let inputValue = 0;
    if (event.target.value === "") return 0;
    if (event.target.name === "weight") {
      inputValue =
        Math.round((parseFloat(event.target.value) + Number.EPSILON) * 100) /
        100;
      return onInputChange(event.target.name, inputValue);
    }
    if (event.target.name === "depth") {
      inputValue =
        Math.round((parseFloat(event.target.value) + Number.EPSILON) * 10) / 10;
      return onInputChange(event.target.name, inputValue);
    }
    inputValue = Math.round(parseFloat(event.target.value));
    return onInputChange(event.target.name, inputValue);
  }

  return (
    <>
      <FormDivBorderStyling> </FormDivBorderStyling>
      <FormSection>
        <Fieldset>
          <legend>
            <strong>
              <u>Ihr Fang:</u>
            </strong>
          </legend>
          <form onSubmit={onHandleSubmit}>
            <FormItem>
              <div>Angler: {catchCard.name}</div>
            </FormItem>
            <FormItem>
              <label htmlFor="fishtype">
                Fischart:
                <div>
                  <select
                    onChange={handleChangeString}
                    id="fishtype"
                    name="fishtype"
                    value={catchCard.fishtype}
                  >
                    {fishtypes.sort().map((fish, _index) => (
                      <option key={_index} value={fish}>
                        {fish}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </FormItem>

            <FormItem>
              <label htmlFor="day">
                Tag:
                <div>
                  <select
                    onChange={handleChangeDate}
                    id="day"
                    name="day"
                    value={catchDate.substring(8,10)}
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
                    onChange={handleChangeDate}
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
                    onChange={handleChangeDate}
                    id="year"
                    name="year"
                    value={catchDate.substring(0,4)}
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
                    onChange={handleChangeDate}
                    id="time"
                    name="time"
                    value={catchDate.substring(11,16)}
                  >
                    {dates.times.map((time, _index) => (
                      <option key={_index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </FormItem>

            <FormItem>
              <label htmlFor="tackle">
                Angelart:
                <div>
                  <select
                    onChange={handleChangeString}
                    id="tackle"
                    name="tackle"
                    value={catchCard.tackle}
                  >
                    {tackle.sort().map((tackle, _index) => (
                      <option key={_index} value={tackle}>
                        {tackle}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </FormItem>

            <FormItem>
              <label htmlFor="length">
                Länge <br /> in cm:
                <div>
                  <NumberInputs
                    onChange={handleChangeFloat}
                    type="number"
                    step="1"
                    id="length"
                    name="length"
                    value={catchCard.length}
                  />
                </div>
              </label>

              <label htmlFor="weight">
                Gewicht <br /> in kg:
                <div>
                  <NumberInputs
                    onChange={handleChangeFloat}
                    type="number"
                    step=".01"
                    id="weight"
                    name="weight"
                    value={catchCard.weight}
                  />
                </div>
              </label>

              <label htmlFor="depth">
                Fangtiefe <br /> in m:
                <div>
                  <NumberInputs
                    onChange={handleChangeFloat}
                    type="number"
                    step=".10"
                    id="depth"
                    name="depth"
                    value={catchCard.depth}
                  />
                </div>
              </label>
            </FormItem>

            <FormItem>
              <label htmlFor="bait">
                Köder:
                <div>
                  <input
                    onChange={handleChangeString}
                    type="text"
                    id="bait"
                    name="bait"
                    value={catchCard.bait}
                  />
                </div>
              </label>
            </FormItem>

            <PhotoPicker catchCard={catchCard} />
          </form>
        </Fieldset>

        <FormButtons>
          <button>Abbrechen</button>
          <button>Veröffentlichen</button>
        </FormButtons>
      </FormSection>
    </>
  );
}

// only styled components from here on

const FormDivBorderStyling = styled.div`
  display: block;
  background-color: var(--color-three);
  position: fixed;
  inset: 0rem;
  opacity: 75%;
  z-index: 12;
`;

const FormSection = styled.section`
  display: block;
  background-color: var(--color-two);
  color: var(--color-one);
  position: fixed;
  inset: 2rem;
  opacity: 100%;
  z-index: 15;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 1rem;
  padding: 0.3rem;
`;

const FormItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 1rem 0.3rem 1rem 0.3rem;
`;

const NumberInputs = styled.input`
  width: 4rem;
`;

const FormButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`;
