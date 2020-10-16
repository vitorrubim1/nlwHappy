import * as React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";

import "leaflet/dist/leaflet.css"; //estilo padrão leaflet

import mapMarker from "../../../images/local.svg";
import "../../../styles/pages/orphanage-map.css";

const iconMap = leaflet.icon({
  //para costumizar um icon com leaflet
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68], //x: metade de 58, y: full em baixo do icon  para dizer em qual parte do icone esta o lugar em si
  popupAnchor: [170, 2],
});

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Itaquaquecetuba</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.4465954, -46.3145157]} //latitude, longitude
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />{" "}
        {/*Para pegar imagem do map, ruas..*/}
        <Marker //marcação no mapa
          icon={iconMap}
          position={[-23.4465954, -46.3145157]}
        >
          <Popup
            closeButton={false}
            minWidth={240}
            maxHeight={300}
            className="map-popup"
          >
            Lar das meninas
            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
