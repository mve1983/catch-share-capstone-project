import { catchFormValidation } from "../src/lib/catchFormValidation";

// Info: some fields of catchCard are mandatory, but not checked by function,
// because they are select inputs and have a default value (for instance: fishtype)
// or autofilled by logged in user (for instance: name)

describe("checks if mandatory fields of catchCardForm correctly filled", () => {
  it("should be valid if mandatory fields are correctly filled", () => {
    const testCard = {
      name: "TestUser",
      fishtype: "A N D E R E",
      date: "2022-01-01",
      time: "morgens",
      length: 10,
      weight: 10,
      latlng: { lat: 0, lng: 0 },
      bait: "",
      depth: 10,
      tackle: "A N D E R E",
      img: "",
    };
    expect(catchFormValidation(testCard)).toStrictEqual([true, ""]);
  });

  it("should be NOT valid if date not filled", () => {
    const testCard = {
      name: "TestUser",
      fishtype: "A N D E R E",
      date: "",
      time: "morgens",
      length: 10,
      weight: 10,
      latlng: { lat: 0, lng: 0 },
      bait: "",
      depth: 10,
      tackle: "A N D E R E",
      img: "",
    };
    expect(catchFormValidation(testCard)).toStrictEqual([
      false,
      "Bitte Datum überprüfen",
    ]);
  });

  it("should be NOT valid if length is not filled or smaller as 1", () => {
    const testCard = {
      name: "TestUser",
      fishtype: "A N D E R E",
      date: "2022-01-01",
      time: "morgens",
      length: -1,
      weight: 10,
      latlng: { lat: 0, lng: 0 },
      bait: "",
      depth: 10,
      tackle: "A N D E R E",
      img: "",
    };
    expect(catchFormValidation(testCard)).toStrictEqual([
      false,
      "Länge muss größer als 0 sein.",
    ]);
  });

  it("should be NOT valid if weight is not filled or smaller as 0.01", () => {
    const testCard = {
      name: "TestUser",
      fishtype: "A N D E R E",
      date: "2022-01-01",
      time: "morgens",
      length: 10,
      weight: 0,
      latlng: { lat: 0, lng: 0 },
      bait: "",
      depth: 10,
      tackle: "A N D E R E",
      img: "",
    };
    expect(catchFormValidation(testCard)).toStrictEqual([
      false,
      "Gewicht muss größer als 0 sein.",
    ]);
  });

  it("should be NOT valid if depth is not filled or smaller as 0", () => {
    const testCard = {
      name: "TestUser",
      fishtype: "A N D E R E",
      date: "2022-01-01",
      time: "morgens",
      length: 10,
      weight: 10,
      latlng: { lat: 0, lng: 0 },
      bait: "",
      depth: -1,
      tackle: "A N D E R E",
      img: "",
    };
    expect(catchFormValidation(testCard)).toStrictEqual([
      false,
      "Tiefe muss mindestens 0 sein (Top Water), ansonsten Fangtiefe angeben. Bsp. 2.3.",
    ]);
  });
});
