import { fishtypes } from "../../lib/catchFormArrays.js";

export default function Fishtype({ catchCard, onHandleChangeString }) {
  return (
    <div className="form-div">
      <label htmlFor="fishtype">
        Fischart:
        <div>
          <select
            onChange={onHandleChangeString}
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
    </div>
  );
}