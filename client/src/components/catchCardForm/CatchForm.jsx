import { useState } from "react";
import styled from "styled-components";
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
  
  function initialPhotoUploadSetter() {
    setPhotoUploadDone(!photoUploadDone);
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
      <div className="form-border-transparent"></div>
      <section className="fade-in-1sec outer-form-container">
        <fieldset className="inner-form-container">
          <legend>
            <strong>Ihr Fang:</strong>
          </legend>
          <form
            onSubmit={(event) => {
              onHandleSubmit(event);
              initialPhotoUploadSetter();
            }}
          >
            <div className="form-div">
              <div>Angler: {catchCard.name}</div>
            </div>
            <Fishtype
              catchCard={catchCard}
              onHandleChangeString={handleChangeString}
            />
            <CatchDate
            catchCard={catchCard}
             onHandleChangeString={handleChangeString}
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
        </fieldset>
        <FormButtons>
          <CancelButton
            onClick={(event) => {
              onCancelSubmit(event);
              initialPhotoUploadSetter();
            }}
          >
            <strong>Abbrechen</strong>
          </CancelButton>
          <ConfirmButton
            onClick={(event) => {
              onHandleSubmit(event);
              initialPhotoUploadSetter();
            }}
          >
            <strong>Veröffentlichen</strong>
          </ConfirmButton>
        </FormButtons>
      </section>
    </>
  );
}

const FormButtons = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 1rem;
`;

const ConfirmButton = styled.button`
  color: var(--color-four);
  border-radius: 0.3rem;
  padding: 0.3rem;
  border: none;
  background-color: darkgreen;
`;

const CancelButton = styled.button`
  color: var(--color-four);
  border-radius: 0.3rem;
  padding: 0.3rem;
  border: none;
  background-color: darkred;
`;
