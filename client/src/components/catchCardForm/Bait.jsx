export default function Bait({ onHandleChangeString, catchCard }) {
  return (
    <div className="form-div">
      <label htmlFor="bait">
        Köder:
        <div>
          <input
            onChange={onHandleChangeString}
            type="text"
            id="bait"
            name="bait"
            value={catchCard.bait}
          />
        </div>
      </label>
    </div>
  );
}
