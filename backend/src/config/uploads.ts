import multer from "multer";
import path from "path";

export default{
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"), //pasta q vai ficar as imagens
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`; //timestamps

      cb(null, fileName); //error: null (muito improvavel dar erro) e o nome do arq
    }
  })
}