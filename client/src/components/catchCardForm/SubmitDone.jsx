import styled from "styled-components";
import confirm from "../../img/green-confirm.png";

export default function SubmitDone({ submitOk }) {
  return (
    <>
      <FormDivBorderStyling />
      <SubmitWrapper>
        <SubmitMessage>
          <div>{submitOk.message}</div>
          <ConfirmSign src={confirm} alt="confirm sign" />
        </SubmitMessage>
      </SubmitWrapper>
    </>
  );
}

const FormDivBorderStyling = styled.div`
  animation: fader2 3s linear;
  display: block;
  background-color: var(--color-one);
  position: fixed;
  inset: 0rem;
  opacity: 75%;
  z-index: -12;

  @keyframes fader2 {
    0% {
      z-index: 12;
      opacity: 75%;
    }
    50% {
      z-index: 12;
      opacity: 75%;
    }
    99% {
      z-index: 12;
      opacity: 0%;
    }
    100% {
      z-index: -12;
      opacity: 0%;
    }
  }
`;

const SubmitWrapper = styled.section`
  animation: fader 3s linear;
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: fixed;
  z-index: -15;
  opacity: 100%;

  @keyframes fader {
    0% {
      z-index: 15;
      opacity: 100%;
    }
    50% {
      z-index: 15;
      opacity: 100%;
    }
    99% {
      z-index: 15;
      opacity: 0%;
    }
    100% {
      z-index: -15;
      opacity: 0%;
    }
  }
`;

const SubmitMessage = styled.section`
  background-color: var(--color-five);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex-grow: 1;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 3rem;
  inset: 2rem;
  position: fixed;
  text-align: center;

`;

const ConfirmSign = styled.img`
  width: 2rem;
  height: auto;
`;
