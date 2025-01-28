const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
