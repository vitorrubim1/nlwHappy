import express from "express";

import "./database/connection"; //startar o banco
import routes from "./routes";

const app = express(); //desacoplando o express

app.use(express.json()); //para receber atraves do body
app.use(routes); //para usar as rotas da aplicação

//Métodos HTTP: Get, Post, Put, Delete
/* Parâmetros: 
  
  Query params: dados pela rota ("http://localhost:3333/users?search=vitor");
  Route params: usado para identificar um recurso "id" ("http://localhost:3333/1");
  Body: informações compostas, provida de um formulario

  console.log(request.query);
  console.log(request.params);
  console.log(request.body);
*/

app.listen(3333);
