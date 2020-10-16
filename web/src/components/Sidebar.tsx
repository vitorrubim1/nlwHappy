import * as React from "react";
import { FiArrowLeft } from "react-icons/fi";

import "../styles/componets/sidebar.css";
import mapMarkerImg from "../images/local.svg";
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  const { goBack } = useHistory(); //voltar a tela

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
