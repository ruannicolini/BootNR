const express = require("express");

const server = express();

// informa que o servidor deve ler o formato json
server.use(express.json());

// ========= PARAMETROS ========= \\

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "nome":"Ruan", "email" : "ruannicolini@gmail.com" }

// Query params
// http://localhost:3000/teste?nome=Ruan
// server.get("/teste", (req, res) => {
//   const nome = req.query.nome;
//   return res.json({ message: `Hello ${nome}` });
//   // return res.send("Hello World!");
// });

// //Route params
// server.get("/users/:index", (req, res) => {
//   const users = ["Diego", "Cláudio", "Victor", "Ruan"];
//   // const index = req.params.index;
//   // ou
//   const { index } = req.params;
//   return res.json(users[index]);
// });

const users = ["Diego", "Cláudio", "Victor", "Ruan"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método = ${req.method}; URL = ${req.url} `);
  next();
  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
}
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists." });
  }

  // adiciona uma nova var dentro do req, e agora toda rota/ Middlewares que
  // for utilizar o checkUserInArray, pode fazer uso dessa variavel.
  req.user = user;

  return next();
}

server.get("/users/:index", checkUserInArray, (req, res) => {
  // const index = req.params.index;
  // ou
  // const { index } = req.params;
  // return res.json(users[index]);

  // utiliza a var req.user criada dentro do checkUserInArray
  return res.json(req.user);
});

// ========= CRUD ========= \\
server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;
  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);
