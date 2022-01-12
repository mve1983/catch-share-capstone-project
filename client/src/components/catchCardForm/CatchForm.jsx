import styled from "styled-components";
import { fishtypes, dates, tackle } from "../../lib/catchFormHelpers.js";

export default function CatchForm({
  catchCard,
  onHandleSubmit,
  onInputChange,
}) {
  function handleChangeString(event) {
    onInputChange(event.target.name, event.target.value);
  }

  function handleChangeFloat(event) {
    let inputValue = 0;
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
                  onChange={handleChangeString}
                  id="day"
                  name="day"
                  value={catchCard.date[0]}
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
                  onChange={handleChangeString}
                  id="month"
                  name="month"
                  value={catchCard.date[1]}
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
                  onChange={handleChangeString}
                  id="year"
                  name="year"
                  value={catchCard.date[2]}
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
                  onChange={handleChangeString}
                  id="time"
                  name="time"
                  value={catchCard.date[3]}
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
            <label htmlFor="length">
              Länge <br /> in cm (z.B. 89):
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
              Gewicht <br /> in kg (z.B. 2,35):
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
              Fangtiefe <br /> in m (z.b: 4,7):
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
            <button>Abbrechen</button>
            <button>Veröffentlichen</button>
          </FormItem>
        </form>
      </Fieldset>
    </FormSection>
  );
}

const FormSection = styled.section`
  display: block;
  background-color: var(--color-one);
  color: var(--color-two);
  position: absolute;
  top: 2vh;
  right: 2vw;
  bottom: 2vh;
  left: 2vw;
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
  justify-content: left;
  align-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 1rem 0.5rem 0 0.5rem;
`;

const NumberInputs = styled.input`
  width: 4rem;
`;
