import { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styled from "styled-components";
import mapStyle from "../lib/mapStyle";
import libraries from "../lib/googleLibs";
import Search from "./MapSearch";
import CatchForm from "./catchCardForm/CatchForm";

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const mapCenter = {
  lat: 53.55032,
  lng: 9.99276,
};

const mapOptions = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map({ catchCard, onHandleSubmit, onInputChange }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const [mapMarkers, setMapMarkers] = useState([]);
  const [mapclicked, setMapClicked] = useState(false);

  const addNewMapMarker = useCallback((event) => {
    setMapClicked(true);
    setMapMarkers((currentMarkers) => [
      ...currentMarkers,
      { lat: event.latLng.lat(), lng: event.latLng.lng() },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const goTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  if (loadError) return "Load Error";
  if (!isLoaded) return "Loading Map";

  const fishMarker = {
    path: "M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z",
    fillColor: "darkred",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.5,
    anchor: new google.maps.Point(15, 15),
  };
  return (
    <>
      <MapWrapper>
        <Search onGoTo={goTo} />
        {mapclicked && (
          <SmoothCatchForm>
            <CatchForm
              catchCard={catchCard}
              onHandleSubmit={onHandleSubmit}
              onInputChange={onInputChange}
            />
          </SmoothCatchForm>
        )}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={mapCenter}
          options={mapOptions}
          onClick={addNewMapMarker}
          onLoad={onMapLoad}
        >
          {mapMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={fishMarker}
            />
          ))}
        </GoogleMap>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta quam
          labore deserunt asperiores cupiditate voluptatum nemo itaque ab
          quaerat, nostrum maiores odit sunt in incidunt vel porro fugit rerum
          perspiciatis possimus esse doloribus eaque enim. Esse libero tenetur
          dicta eos, minima nisi, doloribus suscipit aut, totam laudantium ex
          similique! Pariatur! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consectetur, laborum necessitatibus hic quia
          aperiam, magnam iusto in minima possimus ducimus eligendi vero sit
          doloremque sunt consequatur quis nobis accusamus mollitia libero
          officiis. Mollitia ducimus fugit quas eveniet laboriosam est sit,
          ipsam architecto expedita praesentium dicta necessitatibus earum
          dolore, delectus, possimus ipsum nemo. A libero, modi doloremque
          asperiores ad obcaecati deleniti architecto recusandae ipsa amet quam
          ea accusantium quae quis quisquam nisi iusto impedit adipisci, iste
          deserunt dicta at assumenda. Quis fugiat assumenda, commodi suscipit
          nostrum neque accusamus beatae eos, ab optio, ullam culpa at velit
          eaque dolor eligendi tempore! Voluptates ratione, maiores sit impedit
          aperiam, autem reiciendis necessitatibus fugit nemo porro dolor rem!
          Similique, doloribus reprehenderit. Numquam beatae inventore a minima,
          molestiae magni tempore reiciendis quasi quisquam iusto velit, ex,
          libero eveniet at dolorum vero sed! Nemo voluptate repellat magnam
          odio praesentium in, reprehenderit repellendus quaerat maiores aliquam
          iusto totam architecto incidunt, molestiae non. Natus magnam,
          voluptatem similique qui laborum delectus fuga ea iste! Laborum magnam
          quo nemo iusto debitis, ipsa dolorum modi necessitatibus cumque, eum
          deserunt assumenda odit voluptatem omnis veniam molestias facilis
          similique mollitia est, consequuntur odio unde nulla consectetur sint?
          Cum porro natus, inventore obcaecati corporis id ipsam saepe qui
          temporibus sint, minus quod modi in dolorum doloribus, blanditiis
          ducimus iure repellat aliquam! Possimus aspernatur ratione architecto
          atque ipsam praesentium cum neque consequuntur rerum perspiciatis
          culpa quod aliquam nobis reprehenderit impedit dignissimos vero,
          quaerat exercitationem, adipisci eaque dolores! Exercitationem
          reiciendis voluptatibus iure repudiandae voluptatum rem debitis fugiat
          deleniti iste. Dignissimos quo optio ab inventore alias, quae quam
          quos numquam temporibus dolorem accusantium. Assumenda, obcaecati, ex
          veniam dolores debitis natus voluptatem libero enim consequatur
          repellendus reprehenderit aspernatur illum? Eligendi esse libero
          quaerat dicta tenetur, quas id enim culpa, assumenda consequuntur quod
          officiis! Eius tempora, laudantium iusto dignissimos pariatur placeat
          possimus repellat eos corporis vitae? Aliquam, doloremque. Officia
          totam ea magnam fuga! Provident nostrum tempora voluptatem libero
          praesentium numquam obcaecati enim, vel dolor natus quisquam
          dignissimos quis ratione voluptatibus modi eum reiciendis omnis quas
          optio corrupti tempore iure? Maiores, natus? Velit, dicta eligendi
          perferendis nesciunt impedit laborum quia, enim distinctio doloribus
          deleniti commodi! Esse quasi minima iusto in adipisci dolor, natus
          quam, rem possimus tempore quibusdam harum delectus soluta ratione.
          Dolores eius maxime, aspernatur neque officiis ducimus corrupti amet
          beatae illo nesciunt optio iste laboriosam molestiae nam voluptatem
          eligendi. Eum provident, rem blanditiis quidem cum facere et hic
          fugit, repellendus repellat harum nobis. Suscipit minima veniam soluta
          et fugiat tempora voluptatum dolorem accusamus provident vel quia nemo
          incidunt quisquam, animi voluptates blanditiis quas ipsa possimus, non
          ratione delectus tenetur. Suscipit dolor eum distinctio quas animi
          pariatur ex, in amet ducimus corporis minima nisi eveniet
          necessitatibus ullam recusandae, corrupti consequuntur repudiandae nam
          dignissimos dolorem libero! Culpa dolore obcaecati beatae veritatis
          accusantium incidunt accusamus ipsum optio inventore delectus
          laboriosam, adipisci doloribus perspiciatis sit quibusdam maxime vitae
          magni officia porro voluptatum! Itaque delectus quaerat eveniet.
          Nostrum, exercitationem! Asperiores ab obcaecati vel ipsa tempore,
          repellendus ea magnam veniam architecto blanditiis suscipit itaque
          dignissimos maxime libero sint corrupti porro deserunt voluptas error
          laboriosam harum odio. Sapiente a error voluptate necessitatibus quia,
          placeat asperiores dolor exercitationem dignissimos suscipit aliquid.
          At nihil doloremque deleniti placeat? Possimus distinctio, similique
          totam laborum neque iure aspernatur dicta in natus asperiores id
          officiis, eligendi sapiente nesciunt atque aliquid error enim pariatur
          omnis praesentium. Sed odio inventore accusamus atque officia ipsa
          quasi sequi eveniet ratione! Corrupti aperiam, aliquid consectetur
          incidunt earum iusto soluta laboriosam aut accusantium. Eius beatae
          qui corrupti sunt, error eligendi quod dignissimos aliquam! In
          assumenda blanditiis recusandae. Pariatur reprehenderit sequi,
          repudiandae quidem mollitia earum possimus, quaerat rem delectus natus
          quibusdam eligendi dolor laboriosam! Repellendus saepe sequi ducimus
          necessitatibus tempore omnis in inventore veniam. Voluptatibus
          obcaecati fugit, eum suscipit quis alias fugiat quasi saepe cum
          similique culpa libero quaerat nemo, inventore vitae veniam delectus.
          Maxime aut amet nemo libero itaque soluta fuga debitis, repudiandae
          corporis qui quo ut cupiditate velit nulla, distinctio corrupti minima
          dolore architecto quis ratione quibusdam atque, sed facere tenetur.
          Quos accusantium, exercitationem temporibus, assumenda excepturi
          voluptatem voluptatum provident commodi aut perspiciatis magnam quasi
          fugit dicta laboriosam harum. A iusto quam maiores ullam nulla sit
          deserunt quaerat perferendis, magni illum? Natus, quaerat? Officiis
          animi ab aperiam dolorem tenetur. Tempora minima natus eius nesciunt.
          Corrupti fuga doloremque laborum vel deserunt, beatae soluta harum
          alias atque quidem et cupiditate dolor magni ad sint expedita eius
          tempora nihil cumque molestiae dicta, consectetur tenetur velit. Quos
          dicta odit iure, quis aliquid praesentium tenetur tempore blanditiis
          quae dignissimos quia repellat alias doloremque, repudiandae autem
          laboriosam sit iste dolorem explicabo soluta. Eum quo quisquam
          corrupti numquam laborum adipisci corporis, earum et, ipsa laboriosam
          voluptatibus quibusdam. Delectus, dicta. Similique ipsa maiores iusto
          molestiae iste? Sit suscipit commodi pariatur repellendus voluptatem
          corrupti, perspiciatis illo magni reprehenderit, distinctio nemo esse
          debitis! Vitae temporibus quo adipisci quisquam ad odit atque aut
          provident fugiat eum assumenda recusandae tenetur voluptas, ullam quam
          eaque iure ipsum nihil id minima necessitatibus rerum nulla ut
          aliquam? Maiores esse delectus laboriosam perferendis facere nemo at
          hic dolor soluta fugiat exercitationem enim quas nostrum, earum
          consectetur libero quisquam eius et illum, repudiandae, corporis
          magni. Ea sint facilis voluptatum corrupti ex. Magnam beatae
          architecto non delectus neque corporis perspiciatis pariatur doloribus
          quisquam libero? Deserunt fugit quis soluta repellat hic! Aliquid
          totam pariatur debitis vero eaque distinctio rerum molestias quia
          veniam! Fugiat, minima sit amet totam sint alias. Dolor dolores,
          impedit sapiente quis ex deleniti quae asperiores natus earum numquam
          at perferendis sint ullam blanditiis, cum facere qui similique quas
          nesciunt explicabo! Officiis, ab veritatis incidunt sed quas officia
          labore eligendi molestias id non a perferendis amet modi est
          aspernatur nesciunt placeat, maxime vel. Quod sunt, illum illo
          voluptatum accusamus vel quis neque pariatur reiciendis? Laudantium
          inventore expedita illo minima porro dolorem cupiditate ut cumque nisi
          voluptatibus similique debitis harum, distinctio sapiente illum quia
          maxime, sunt veritatis est necessitatibus ab facilis quod, molestiae
          pariatur. Adipisci deserunt est enim. Odio dolorem dolore eius
          repudiandae blanditiis laborum eaque voluptatibus eum nulla magni
          reprehenderit, asperiores debitis, nihil fugit!
        </div>
      </MapWrapper>
    </>
  );
}

const MapWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  margin: 6rem 1rem 1rem 1rem;
`;

const SmoothCatchForm = styled.section`
  animation: fadein 1s linear;
  position: relative;
  z-index: 10;

  @keyframes fadein {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;
