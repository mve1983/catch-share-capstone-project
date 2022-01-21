import styled from "styled-components";

export default function CatchCard({ catchCards }) {
  return (
    <>
      <CardItem>
        <Photo
          src={
            catchCards[0].img.length > 0
              ? `data:image/jpeg;base64,${catchCards[0].img}`
              : "https://raw.githubusercontent.com/mve1983/catch-share-capstone-project/card-render/client/src/img/no-photo.jpg"
          }
          alt="Fangbild"
        />

        <div>
          Fisch: <br />
          {catchCards[0].fishtype}
        </div>
      </CardItem>
      <CardItem>
        <div>
          Länge: <br />
          {catchCards[0].length} cm
        </div>
        <div>
          Gewicht: <br />
          {catchCards[0].weight} kg
        </div>
      </CardItem>
      <CardItem>
        <div>
          <small>
            gefangen von: <br />
            {catchCards[0].name}
          </small>
        </div>
        <div>
          <small>
            am: <br />
            TestTestTest
          </small>
        </div>
      </CardItem>
    </>
  );
}

const CardItem = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  gap: 1rem;
`;

const Photo = styled.img`
  width: 7rem;
`;
