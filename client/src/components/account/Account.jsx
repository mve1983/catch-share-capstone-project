import styled from "styled-components";
import { useEffect, useState } from "react";
import background from "../../img/background.jpg";
import { fetchCatchCardsWithUserName } from "../../lib/fetchesMongodb";

export default function Account({ userInfo }) {
  const [userCatchCards, setUserCatchCards] = useState([]);

  useEffect(() => {
    function loadUserCatchCards(name) {
      fetchCatchCardsWithUserName(name).then((data) => setUserCatchCards(data));
    }
    loadUserCatchCards(userInfo.name);
  }, []);

  console.log(userCatchCards[0]);

  return (
    <>
      <BackgroundImage />
      <AccountWrapper>
        <article>
          <div>{userInfo.name}</div>
          <div>{userInfo.email}</div>
          <div>Geteilte Fänge: {userCatchCards.length}</div>
        </article>

        <Card>
          <CardItem>
            Fisch: {userCatchCards.fishtype} / gefangen am:{" "}
            {userCatchCards.date}
          </CardItem>
          <CardItem>
            Fangmeldung erstellt: test / Fangmeldung zuletzt upgedated: test
          </CardItem>
          <CardItem>
            <button>Update</button>
            <button>Löschen</button>
          </CardItem>
        </Card>
      </AccountWrapper>
    </>
  );
}

const BackgroundImage = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 75%;
  position: fixed;
  inset: 0;
  z-index: -15;
`;

const AccountWrapper = styled.section`
  margin: 7rem 1rem 1rem 1rem;
  text-align: center;
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
`;

const CardItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`