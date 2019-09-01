const express = require("express");
const server = express();
server.use(express.json());

const projects = [
  { id: "1", title: "Titulo1", tasks: [] },
  { id: "2", title: "Titulo2", tasks: [] },
  { id: "3", title: "Titulo3", tasks: [] },
  { id: "4", title: "Titulo4", tasks: [] },
  { id: "5", title: "Titulo5", tasks: [] }
];

var numRequisicoes = 0;

server.use((req, res, next) => {
  numRequisicoes = numRequisicoes + 1;
  console.log(`O numero total de requisições é ${numRequisicoes} `);
  return next();
});

function verificaProjetoExiste(req, res, next) {
  req.id = req.params.id;
  req.indexItemProject = projects.findIndex(p => p.id === req.id);
  req.project = projects.find(p => p.id === req.id);

  if (!req.project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, task: [] };
  projects.push(project);
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", verificaProjetoExiste, (req, res) => {
  const { title } = req.body;
  req.project.title = title;
  return res.json(req.projects);
});

server.delete("/projects/:id", verificaProjetoExiste, (req, res) => {
  projects.splice(req.indexItemProject, 1);
  return res.json(projects);
});

server.post("/projects/:id/tasks", verificaProjetoExiste, (req, res) => {
  const { title } = req.body;
  req.project.tasks.push(title);
  return res.json(req.project);
});

server.listen(3000);
