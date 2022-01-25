import { useState } from "react";
import styled from "styled-components";
import plus from "../img/plus.png";

export default function CatchCard({ catchCards }) {
  const [bigCardToShowID, setBigCardToShowID] = useState("");
  const [fader, setFader] = useState("fade-in-1sec");
  const [bigCard, setBigCard] = useState([]);

  function setBigCatchCard(id) {
    setBigCardToShowID(id);
    setBigCard(catchCards.filter((bigCard) => bigCard._id === id));
  }

  function closeBigCard() {
    setFader("fade-out-1sec");
    setTimeout(() => {
      setBigCardToShowID("");
      setBigCard([]);
      setFader("fade-in-1sec");
    }, 1000);
  }

  return (
    <>
      {catchCards.length === 0 && (
        <CardWrapperSmall>
          <NoMarkerInfo>
            Marker anklicken um Fangmeldungen hier zu zeigen...
          </NoMarkerInfo>
        </CardWrapperSmall>
      )}
      {catchCards.map((card) => (
        <CardWrapperSmall key={card._id}>
          <CardPhoto>
            <PhotoSmall
              src={
                card.img.length > 0
                  ? `data:image/jpeg;base64,${card.img}`
                  : "https://raw.githubusercontent.com/mve1983/catch-share-capstone-project/card-render/client/src/img/no-photo.jpg"
              }
              alt="Fangbild"
            />
          </CardPhoto>
          <CardInfoSmall>
            <div>
              <small>Fisch:</small> <br />
              {card.fishtype}
            </div>
            <Plus onClick={() => setBigCatchCard(card._id)}>
              <img src={plus} alt="show-more-sign" />
            </Plus>
            <div>
              <small>Länge:</small> <br />
              {card.length} cm
            </div>
            <div>
              <small>Gewicht:</small> <br />
              {card.weight} kg
            </div>
          </CardInfoSmall>
        </CardWrapperSmall>
      ))}

      {bigCardToShowID.length > 0 && (
        <>
          <div className="form-border-transparent"></div>
          <section className={`${fader} outer-form-container`}>
            <div className="inner-form-container">
              <CardWrapperBig>
                <PhotoBig
                  src={
                    bigCard[0].img.length > 0
                      ? `data:image/jpeg;base64,${bigCard[0].img}`
                      : "https://raw.githubusercontent.com/mve1983/catch-share-capstone-project/card-render/client/src/img/no-photo.jpg"
                  }
                  alt="Fangbild"
                />
                <CardInfoBig>
                  <div>Fischart:</div> <Data>{bigCard[0].fishtype}</Data>
                </CardInfoBig>
                <CardInfoBig>
                  <div>gefangen mit:</div> <Data>{bigCard[0].tackle}</Data>
                </CardInfoBig>
                <CardInfoBig>
                  <div>Köder</div>
                  <Data>
                    {bigCard[0].bait.length > 0
                      ? bigCard[0].bait
                      : "nicht genannt"}
                  </Data>
                </CardInfoBig>
                <CardInfoBig>
                  <LengthWeightStyle>
                    Länge:<Data>{bigCard[0].length}cm</Data>
                    Gewicht:<Data>{bigCard[0].weight}kg</Data>
                  </LengthWeightStyle>
                </CardInfoBig>
                <CardInfoBig>
                  <div>gefangen in Tiefe:</div>
                  <Data>{bigCard[0].depth}m</Data>
                </CardInfoBig>
                <CardInfoBig>
                  <div>gefangen von:</div> <Data> {bigCard[0].name}</Data>
                  <div>am:</div>
                  <Data>
                    {bigCard[0].date} / {bigCard[0].time}
                  </Data>
                </CardInfoBig>
              </CardWrapperBig>
            </div>
            <CloseButton onClick={closeBigCard}>Schließen</CloseButton>
          </section>
        </>
      )}

      <FormatDiv />
    </>
  );
}

const NoMarkerInfo = styled.div`
  text-align: center;
  line-height: 1.5rem;
`;

const CardWrapperSmall = styled.article`
  background-color: var(--color-five);
  border: 0.2rem solid var(--color-four);
  border-radius: 0.3rem;
  height: 11rem;
  margin: 1rem;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`;

const CardPhoto = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CardInfoSmall = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-content: left;
  align-items: left;
  gap: 0.3rem;
`;

const PhotoSmall = styled.img`
  border-radius: 0.5rem;
  max-height: 9rem;
  max-width: 9rem;
`;

const PhotoBig = styled.img`
  border-radius: 0.5rem;
  max-width: 70vw;
  height: auto;
  margin-bottom: 1rem;
`;

const Plus = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

const FormatDiv = styled.div`
  margin-bottom: 5rem;
`;

const CloseButton = styled.button`
  color: var(--color-four);
  border-radius: 0.3rem;
  padding: 0.3rem;
  border: none;
  background-color: darkred;
`;

const CardWrapperBig = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const CardInfoBig = styled.div`
  border-bottom: 1px solid var(--color-three);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  line-height: 1.2rem;
  margin: 0.4rem;
  width: 70vw;
`;

const Data = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const LengthWeightStyle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
