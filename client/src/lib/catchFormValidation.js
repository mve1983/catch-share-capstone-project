function catchFormValidation(card) {
    if (card.date === "") return [false, "Bitte Datum überprüfen"]
    if (card.length < 1) return [false, "Länge muss größer als 0 sein."]
    if (card.weight < 0.01) return [false, "Gewicht muss größer als 0 sein."]
    if (card.depth < 0) return [false, "Tiefe muss mindestens 0 sein (Top Water), ansonsten Fangtiefe angeben. Bsp. 2.3."]
    return [true, ""]
}

export { catchFormValidation }