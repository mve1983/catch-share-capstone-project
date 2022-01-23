import styled from "styled-components";

export default function CatchCard({ catchCards }) {
  return (
    <>
      <CardPhoto>
        <Photo
          src={
            catchCards[0].img.length > 0
              ? `data:image/jpeg;base64,${catchCards[0].img}`
              : "https://raw.githubusercontent.com/mve1983/catch-share-capstone-project/card-render/client/src/img/no-photo.jpg"
          }
          alt="Fangbild"
        />
      </CardPhoto>
      <CardInfo>
        <div>
          Fisch: <br />
          {catchCards[0].fishtype}
        </div>

        <div>
          Länge: <br />
          {catchCards[0].length} cm
        </div>

        <div>
          Gewicht: <br />
          {catchCards[0].weight} kg
        </div>
      </CardInfo>
    </>
  );
}

const CardPhoto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-height: 10rem;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: left;
  align-items: left;
  gap: 1rem;
`;

const Photo = styled.img`
  max-height: 9rem;
  max-width: 8rem;
`;
