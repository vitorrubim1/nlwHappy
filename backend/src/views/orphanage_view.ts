import Orphanage from "../models/Orphanage";
import imagesView from './images_view';

export default {
  render(orphanage: Orphanage) { //aq so retorna um
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]) { //aq retorna todos
    return orphanages.map(orphanage => this.render(orphanage))
  }
};

//agora vai ser funçao da view, oq irá ser retornado pro web/mobile