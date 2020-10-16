import express from "express";
import path from "path";
import cors from "cors";
import "express-async-errors"; //pelo express ter metodos assincronos, o erro passa direto, então essa lib ajuda a prever erros

import errorHandler from "./errors/handlers";
import "./database/connection"; //startar o banco
import routes from "./routes";

const app = express(); //desacoplando o express

app.use(cors()); //para q o front possa fazer requisição ao back
app.use(express.json()); //para receber atraves do body
app.use(routes); //para usar as rotas da aplicação

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads"))); //pra renderizar as imagens
app.use(errorHandler); //Para tratativa de erros

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
