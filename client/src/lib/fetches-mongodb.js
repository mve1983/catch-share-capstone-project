async function fetchCatchCardsOnMarker(marker) {
  const result = await fetch("/api/catchcards/onmarker", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marker),
  });
  await result.json();
 return resultJson
}

async function addCatchCardToDatabase(catchCard) {
  const result = await fetch("/api/catchcards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catchCard),
  });
  const resultJson = await result.json();
  return resultJson
}

async function fetchAllMapMarkers() {
  const result = await fetch("/api/catchcards/markers");
  const resultJson = await result.json();
  return resultJson
}


export { fetchCatchCardsOnMarker, addCatchCardToDatabase, fetchAllMapMarkers };