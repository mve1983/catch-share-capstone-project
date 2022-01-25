import styled from "styled-components";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "../lib/css/combobox-styles-weather.css";
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function Search({ onFetchWeatherData, onSearchPlace }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 53.55032, lng: () => 9.99276 },
      radius: 100000,
    },
  });

  return (
    <SearchbarWrapper>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const place = await getDetails(results[0]);
            console.log(place)
            onFetchWeatherData({ lat, lng });
            setValue("", false);
          } catch (error) {
            console.log("Error, something went wrong!");
          }

          
        }}
      >
        <ComboboxInput
          className="input-combobox"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          disabled={!ready}
          placeholder="Suche Ort..."
        />

        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ description, place_id }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </SearchbarWrapper>
  );
}

const SearchbarWrapper = styled.div`
margin: 6rem 2rem 3rem 2rem;
text-align: center;
`;
