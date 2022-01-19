import { useState } from "react";
import styled from "styled-components";

export default function CatchCard({ catchCards }) {

  
  catchCards.length > 0 && console.log(catchCards);

  // const imageBuffer =
  //   catchCards.length > 0 ? Buffer.from(catchCards[0].img.data.data) : null;
  // imageBuffer === null ? null : console.log(imageBuffer);

  return (
    <CatchCardSmallSection>
      <article>
        {/* {catchCards.length > 0 && <img src={blobLink} alt="Fangbild" />} */}
        {/*   <div>Fisch: {catchCards.fishtype}</div>
    <div>Länge: {catchCards.length}</div>
      <div></div>
  <div><small>gefangen von: {catchCards.name}</small></div> */}
      </article>
    </CatchCardSmallSection>
  );
}

const CatchCardSmallSection = styled.section``;
