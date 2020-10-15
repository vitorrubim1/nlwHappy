import Image from "../models/Images";

export default {
  render(image: Image) {
    //aq so retorna um
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    //aq retorna todos
    return images.map((image) => this.render(image));
  },
};

//agora vai ser funçao da view, oq irá ser retornado pro web/mobile
