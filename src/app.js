import express from "express";
const app = express();

app.listen(3000, (req, res) => {
  console.log("Connected with express");
});

const genAPIKey = () => {
  return [...Array(10)].map((e) => ((Math.random() * 10) | 0))
  .join("");
};

const key = genAPIKey()
console.log(key);


const authenticateKey = (req, res, next) => {
  let api_key = req.header("x-api-key");
  if (api_key && api_key == key) {
    next()
  } else {
    res.status(403).send({ error: { code: 403, message: "You are not allowed." } });
  }
};

app.get("/api/private-data", authenticateKey, (req, res) => {
    res.status(200).send({ success: { code: 200, message: "You are allowed." } });
});
