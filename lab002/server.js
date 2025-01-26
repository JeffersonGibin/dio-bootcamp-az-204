const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CI/CD com AZURE DEVOPS",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
