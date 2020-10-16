import * as React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import "../../../styles/pages/create-orphanage.css";
import Sidebar from "../../../components/Sidebar";
import mapIcon from "../../../utils/mapIcon";
import api from "../../../services/api";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 });

  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const [opening_hours, setOpeningHours] = React.useState("");
  const [open_on_weekends, setOpenOnWeekends] = React.useState(true);
  const [images, setImages] = React.useState<File[]>([]); //pra aceitar array de imagens
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    //evento que pega a posicao que foi clicada dentro do mapa

    const { lat, lng } = event.latlng;

    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: React.ChangeEvent<HTMLInputElement>) {
    //para saber o tipo coloca o mouse em cima do onChange

    if (!event.target.files) {
      return; //caso não tenha imagens, ja sai da função
    }

    // const selectedImages = Array.from(event.target.files); //pra converter os files em array, pro estado de imagens
    const selectedImages = [...images, ...Array.from(event.target.files)]; //pra converter os files em array, pro estado de imagens
    setImages(selectedImages);

    //blob pra retornar uma url pra mostrar o preview da imagem
    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image); //retorno uma url da imagem escolhida
    });

    setPreviewImages(selectedImagesPreview); //setando as imagens percorridas
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData(); //não pode enviar json com imagem dentro, então usa-se FormData()

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    images.forEach(image => { //imagem é um array, então percorro e envio uma por uma
      data.append("images", image);
    })

    console.log({
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    await api.post("orphanages", data);

    alert("Cadastro realizado com sucesso!");
    history.push("/app")
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.4465954, -46.3145157]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages?.map((image) => (
                  <img key={image} src={image} alt={name} />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
