import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

import questionsDAO from "./dao/questionsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.HIREMEPLS_DB_URI)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await questionsDAO.injectDB(client);
    app.listen(port, () => {
      console.log("listening on port ", port);
    });
  });
