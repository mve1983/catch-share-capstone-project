import { useState } from "react";
import styled from "styled-components";
import { dates } from "../../lib/catchFormArrays.js";
import PhotoPicker from "./FileUpload.jsx";
import Fishtype from "./Fishtype.jsx";
import CatchDate from "./CatchDate.jsx";
import DepthLengthWeight from "./DepthLengthWeight.jsx";
import Bait from "./Bait.jsx";
import Tackle from "./Tackle.jsx";

export default function CatchForm({
  catchCard,
  onHandleSubmit,
  onCancelSubmit,
  onInputChange,
}) {
  const [photoUploadDone, setPhotoUploadDone] = useState(false);
  const [catchDate, setCatchDate] = useState("2021-01-01T00:00:00");

  function initialPhotoUploadSetter() {
    setPhotoUploadDone(!photoUploadDone);
  }

  function handleChangeDate(event) {
    switch (event.target.name) {
      case "year":
        setCatchDate(
          event.target.value + catchDate.substring(4, catchDate.length)
        );
        break;
      case "month":
        let monthFinder = dates.months.indexOf(event.target.value) + 1;
        monthFinder > 9
          ? setCatchDate(
              catchDate.substring(0, 5) +
                monthFinder.toString() +
                catchDate.substring(7, catchDate.length)
            )
          : setCatchDate(
              catchDate.substring(0, 5) +
                "0" +
                monthFinder.toString() +
                catchDate.substring(7, catchDate.length)
            );
        break;
      case "day":
        setCatchDate(
          catchDate.substring(0, 8) +
            event.target.value +
            catchDate.substring(10, catchDate.length)
        );
        break;
      case "time":
        setCatchDate(
          catchDate.substring(0, 11) +
            event.target.value +
            catchDate.substring(16, catchDate.length)
        );
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
          <form onSubmit={(event) => {onHandleSubmit(event); initialPhotoUploadSetter()}}>
            <div className="form-div">
              <div>Angler: {catchCard.name}</div>
            </div>
            <Fishtype
              catchCard={catchCard}
              onHandleChangeString={handleChangeString}
            />
            <CatchDate
              catchDate={catchDate}
              onHandleChangeDate={handleChangeDate}
            />
            <Tackle
              catchCard={catchCard}
              onHandleChangeString={handleChangeString}
            />
            <DepthLengthWeight
              catchCard={catchCard}
              onHandleChangeFloat={handleChangeFloat}
            />
            <Bait
              catchCard={catchCard}
              onHandleChangeString={handleChangeString}
            />
            <PhotoPicker
              catchCard={catchCard}
              onInputChange={onInputChange}
              onPhotoUpload={initialPhotoUploadSetter}
              photoUploadDone={photoUploadDone}
            />
          </form>
        </Fieldset>
        <FormButtons>
          <button onClick={(event) => {onCancelSubmit(event); initialPhotoUploadSetter()}}>Abbrechen</button>
          <button onClick={(event) => {onHandleSubmit(event); initialPhotoUploadSetter()}}>Veröffentlichen</button>
        </FormButtons>
      </FormSection>
    </>
  );
}

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

const FormButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`;
