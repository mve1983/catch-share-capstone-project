import styled from "styled-components";
import { useEffect, useState } from "react";
import background from "../../img/background.jpg";
import {
  fetchCatchCardsWithUserName,
  deleteOneCatchCard,
} from "../../lib/fetchesMongodb";

export default function Account({ userInfo }) {
  const [userCatchCards, setUserCatchCards] = useState([]);
  const [newFilteredCardArray, setNewFilteredCardArray] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [showDetailedCards, setShowDetailedCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState("");

  useEffect(() => {
    function loadUserCatchCards(name) {
      fetchCatchCardsWithUserName(name).then((data) => setUserCatchCards(data));
    }
    loadUserCatchCards(userInfo.name);
  }, []);

  function filterCards(event) {
    setCurrentSearch(event.target.value);
    const filteredArray = userCatchCards.filter(
      (card) =>
        card.fishtype
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        card.createdAt
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        card.updatedAt
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        card.date.toLowerCase().includes(event.target.value.toLowerCase())
    );
    filteredArray.length > 0
      ? setNewFilteredCardArray(filteredArray)
      : setNewFilteredCardArray([]);
  }

  function cardsToShowDetailed(_event, cardId) {
    if (showDetailedCards.includes(cardId))
      return setShowDetailedCards(
        showDetailedCards.filter((id) => id !== cardId)
      );
    setShowDetailedCards([...showDetailedCards, cardId]);
  }

  function deleteCardConfirm(_event, id) {
    setCardToDelete(id);
  }

  return (
    <>
      <BackgroundImage />
      <AccountWrapper>
        <article>
          <div>{userInfo.name}</div>
          <div>{userInfo.email}</div>
          <div>Geteilte Fänge: {userCatchCards.length}</div>
        </article>

        <CardWrapper>
          <Search
            type="text"
            onChange={filterCards}
            placeholder="Suche nach Fisch oder Datum(Bsp.2022-01-25)"
          />
          {currentSearch.length > 0 && newFilteredCardArray.length === 0 ? (
            <NotFound>Leider nichts mit den Daten gefunden.</NotFound>
          ) : (
            (newFilteredCardArray.length > 0
              ? newFilteredCardArray
              : userCatchCards
            ).map((card, index) => (
              <Card key={card._id}>
                <CardItem>
                  Fisch: {card.fishtype} / gefangen: {card.date}
                </CardItem>
                <CardItem>
                  Fangmeldung erstellt:{" "}
                  {card.createdAt.substring(0, 10) +
                    " " +
                    card.createdAt.substring(11, 16)}
                </CardItem>
                <CardItem>
                  <button
                    onClick={(event) => deleteCardConfirm(event, card._id)}
                  >
                    Löschen
                  </button>
                  <button
                    onClick={(event) => cardsToShowDetailed(event, card._id)}
                  >
                    {showDetailedCards.includes(card._id) ? "Weniger" : "Mehr"}{" "}
                    Daten zeigen
                  </button>
                </CardItem>

                {showDetailedCards.includes(card._id) && (
                  <>
                    <CardItem>Gefangen mit: {card.tackle}</CardItem>
                    <CardItem>
                      Länge (cm): {card.length} / Weight (kg): {card.weight}
                    </CardItem>
                    <CardItem>Tiefe (m): {card.depth}</CardItem>
                    <CardItem>
                      Köder:{" "}
                      {card.bait.length > 0 ? card.bait : "nicht genannt"}
                    </CardItem>
                    <CardItem>
                      <img
                        src={
                          card.img.length > 0
                            ? `data:image/jpeg;base64,${card.img}`
                            : "https://raw.githubusercontent.com/mve1983/catch-share-capstone-project/main/client/src/img/no-photo.jpg"
                        }
                        alt="Fangbild"
                      />
                    </CardItem>
                  </>
                )}
              </Card>
            ))
          )}
        </CardWrapper>

        {cardToDelete.length > 0 && (
          <>
            <div className="form-border-transparent"></div>
            <DeleteWrapper>
              <div>Wirklich undwideruflich löschen?</div>
              <button>Löschen</button>
              <button>Abbrechen</button>
            </DeleteWrapper>
          </>
        )}
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

const Search = styled.input`
  border-radius: 0.3rem;
  padding: 0.5rem;
  width: 20rem;
`;

const NotFound = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  text-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
`;

const CardWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Card = styled.article`
  background: linear-gradient(-45deg, var(--color-four), var(--color-five));
  border: 0.2rem solid var(--color-four);
  box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  border-radius: 0.3rem;
  font-size: 0.8rem;
  min-width: 343px;
  max-width: 500px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  gap: 5rem;
  text-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);

  button {
    border: none;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.1rem 0.3rem;
    box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
    color: var(--color-three);
    background-color: var(--color-five);
  }
  img {
    box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
    border-radius: 0.5rem;
    max-height: 9rem;
    max-width: 9rem;
  }
`;

const DeleteWrapper = styled.div`
  background: linear-gradient(-45deg, var(--color-four), var(--color-five));
  box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem;
  text-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 25;

  button {
    border: none;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.1rem 0.3rem;
    box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
    color: var(--color-three);
    background-color: var(--color-five);
  }
`;
