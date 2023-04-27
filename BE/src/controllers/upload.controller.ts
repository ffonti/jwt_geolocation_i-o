import * as fs from "fs";

exports.uploadFile = async (req, res) => {
  if (!fs.existsSync("assets/uploads")) {
    fs.mkdirSync("./assets/uploads/");
  }

  for (let i = 0; i < req.files.length; i++) {
    console.log(req.files[i].originalname);
  }

  res.status(200).json({ msg: "File caricato!" });
};

/*
salvare sul db:
  nome_fico.estensione (flower)
  nome_brutto (codice lungo)
  idUtente
-----------
fs.existSync -> controlla se esiste o no una cartella
devo constrollare che esista assets/uploads
  se non esiste, faccio fs.mkdirSync() crea la cartella
fra le opzioni, c'è recursiveTrue e la metto sempre a false????
-----------
scorro tutti i files e faccio un fs.rename('./assets/uploads/nome_brutto', './assets/uploads/nome_fico', (err)=>{console.log(err)}) e metto il nome originale
-----------
controlli vari:
  si pdf, jpg, png e no a tutti gli altri
  dim max 10mb
*/
/*
nel route, il file viene messo nella cartella ancora prima di passare al controller
*/
