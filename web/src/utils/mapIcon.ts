import leaflet from "leaflet";

import mapMarkerImg from "../images/local.svg";

const mapIcon = leaflet.icon({
  //para costumizar um icon com leaflet
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68], //x: metade de 58, y: full em baixo do icon  para dizer em qual parte do icone esta o lugar em si
  popupAnchor: [0, -60],
});

export default mapIcon;
