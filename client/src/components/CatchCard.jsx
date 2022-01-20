import styled from "styled-components";

export default function CatchCard({ catchCards }) {
  return (
    <CardWrapper>
      <CardItem>
        <Photo
          src={`data:image/jpeg;base64,${catchCards[0].img}`}
          alt="Fangbild"
        />
      </CardItem>
      <CardItem>
        <div>Fisch: {catchCards[0].fishtype}</div>
        <div>Länge: {catchCards[0].length}</div>
        </CardItem>
        <CardItem>
        <div>
          <small>gefangen von: {catchCards[0].name}</small>
        </div>
        </CardItem>
    </CardWrapper>
  );
}

const CardWrapper = styled.section`
  background-color: var(--color-four);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: .3rem;
  margin: 1rem;
`;

const CardItem = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: .3rem;
  margin: 1rem;
`;

const Photo = styled.img`
  width: 120px;
`;
