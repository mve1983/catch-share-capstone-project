async function fetchCatchCardsOnMarker(marker) {
  let lat = marker.lat;
  let lng = marker.lng;
  const result = await fetch(`/api/catchcards/onmarker/${lat}_${lng}`);
  const resultJson = await result.json();
  return resultJson;
}

async function addCatchCardToDatabase(catchCard) {
  try {
    const result = await fetch("/api/catchcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(catchCard),
    });
    const resultJson = await result.json();
    return resultJson;
  } catch (error) {
    return error.message;
  }
}

async function fetchAllMapMarkers() {
  const result = await fetch("/api/catchcards/markers");
  const resultJson = await result.json();
  return resultJson;
}

async function fetchThreeNewestCatchCards() {
  const result = await fetch("/api/catchcards/threenewest");
  const resultJson = await result.json();
  return resultJson;
}

async function fetchCatchCardsWithUserName(name) {
  const result = await fetch(`/api/catchcards/${name}`);
  const resultJson = await result.json();
  return resultJson;
}

async function fetchDeleteOneCatchCard(id) {
  try {
    const result = await fetch(`/api/catchcards/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      });
    const resultJson = await result.json();
    return resultJson;
  } catch (error) {
    return error.message;
  }
}

export {
  fetchCatchCardsOnMarker,
  addCatchCardToDatabase,
  fetchAllMapMarkers,
  fetchThreeNewestCatchCards,
  fetchCatchCardsWithUserName,
  fetchDeleteOneCatchCard
};
