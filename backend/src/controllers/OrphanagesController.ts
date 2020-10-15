import { Request, Response } from "express";
import { getRepository } from "typeorm"; //as alterações, criações precisa passar por aq

import Orphanage from "../models/Orphanage";

export default {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage); //pegar o model

    const orphanages = await orphanageRepository.find(); //buscando tudo

    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params; //id q vem pela url
    console.log(id);
    const orphanageRepository = getRepository(Orphanage); //pegar o model

    const orphanage = await orphanageRepository.findOneOrFail(id); //buscando um especifico

    return response.json(orphanage);
  },

  async create(request: Request, response: Response){
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
  
    const orphanage = orphanageRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    }); //criando o orfanato apenas
  
    await orphanageRepository.save(orphanage); //agora salvo no banco
  
    return response.status(201).json(orphanage); //retornando o orfanato, com 201: sucesso na criação
  
  }
};