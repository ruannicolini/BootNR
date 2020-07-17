import React, { useState } from "react";

import "./App.css";
import bgImage from "./assets/background.jpg";
import Header from "./components/Header";

function App() {
  // useState sempre retorna um array com 2 posicoes.
  // na primeira posicao a variavel com os valores do estado inicial
  // na segunda posicao uma funcao para atualizar os estados
  const [projects, setProjects] = useState([
    "Desenvolvimento App",
    "Front-end Web",
  ]);

  function handleAddProject() {
    //setState deve criar sempre um novo registro, nunca alterar o valor anterior.
    // por isso criei um novo array com todas as informacoes do antigo mais o novo projeto
    // Conceito de imultabilidade dos estados no react
    setProjects([...projects, `Novo Projeto ${Date.now()}`]);
  }

  return (
    <>
      <Header title="projects" />

      <img width={3000} src={bgImage} />

      <ul>
        {projects.map((proj) => (
          <li key={proj}>{proj}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
