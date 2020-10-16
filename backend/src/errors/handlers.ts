import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  // handleError: ErrorRequestHandler >> para seguir o mesmo formato do express
  //capturar os erros e fazer um log pra não exibir ao usuario final e ajudar no desenvolvimento

  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors; //percorrer o erro que me retorna pra saber se é erro de validação
    });

    return response.status(400).json({ message: "Validation fails", errors });
    //status(400): bad request error de requisicao mal feita nesse caso validação
  }

  console.error(error);

  return response.status(500).json({ message: "Internal server Error" });
  //erro interno, o cliente não precisa saber (o status 500) simboliza isso
};

export default errorHandler;
