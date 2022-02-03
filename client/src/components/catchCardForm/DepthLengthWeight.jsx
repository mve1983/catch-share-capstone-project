import styled from "styled-components";

export default function DepthLengthWeight({ catchCard, onHandleChangeFloat }) {
  return (
    <div className="form-div">
      <label htmlFor="length">
        Länge <br /> in cm:
        <div>
          <NumberInputs
            onChange={onHandleChangeFloat}
            type="number"
            step="1"
            id="length"
            name="length"
            value={catchCard.length}
            placeholder="43..."
          />
        </div>
      </label>
      <label htmlFor="weight">
        Gewicht <br /> in kg:
        <div>
          <NumberInputs
            onChange={onHandleChangeFloat}
            type="number"
            step=".01"
            id="weight"
            name="weight"
            value={catchCard.weight}
            placeholder="0.83"
          />
        </div>
      </label>
      <label htmlFor="depth">
        Fangtiefe <br /> in m:
        <div>
          <NumberInputs
            onChange={onHandleChangeFloat}
            type="number"
            step=".10"
            id="depth"
            name="depth"
            value={catchCard.depth}
            placeholder="2.3"
          />
        </div>
      </label>
    </div>
  );
}

const NumberInputs = styled.input`
  width: 4rem;
`;
