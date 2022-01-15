import { tackle } from "../../lib/catchFormArrays.js";

export default function Tackle({ onHandleChangeString, catchCard }) {
  return (
    <div className="form-div">
      <label htmlFor="tackle">
        Angelart:
        <div>
          <select
            onChange={onHandleChangeString}
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
    </div>
  );
}
