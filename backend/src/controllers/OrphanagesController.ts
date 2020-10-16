import { Request, Response } from "express";
import { getRepository } from "typeorm"; //as alterações, criações precisa passar por aq
import * as Yup from "yup";

import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanage_view";

export default {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage); //pegar o model

    const orphanages = await orphanageRepository.find({
      relations: ["images"], //para trazer as imagens
    }); //buscando tudo

    return response.json(orphanageView.renderMany(orphanages)); //minha view que controla as infomaçoes de retorno
  },

  async show(request: Request, response: Response) {
    const { id } = request.params; //id q vem pela url
    console.log(id);
    const orphanageRepository = getRepository(Orphanage); //pegar o model

    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ["images"],
    }); //buscando um especifico

    return response.json(orphanageView.render(orphanage)); //minha view que controla as infomaçoes de retorno
  },

  async create(request: Request, response: Response) {
    console.log(request.file);

    const {
      //desestruturando as variaveis q vem do form
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanageRepository = getRepository(Orphanage); //pegar o model

    const requestImages = request.files as Express.Multer.File[]; //forçando a ser um array

    const images = requestImages.map((image) => {
      return { path: image.filename }; //para salvar somente o nome da imagem
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    //validações
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          //formato do objeto
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false, //para avisar caso haja erro em algum campo
    });

    const orphanage = orphanageRepository.create(data); //criando o orfanato apenas

    await orphanageRepository.save(orphanage); //agora salvo no banco
    return response.status(201).json(orphanage); //retornando o orfanato, com 201: sucesso na criação
  },
};
