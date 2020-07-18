import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./App.css";
import bgImage from "./assets/background.jpg";
import Header from "./components/Header";

function App() {
  // useState sempre retorna um array com 2 posicoes.
  // na primeira posicao a variavel com os valores do estado inicial
  // na segunda posicao uma funcao para atualizar os estados
  const [projects, setProjects] = useState([]);

  //teste
  useEffect(() => {
    api.get("patologia").then((response) => {
      setProjects(response.data);
      console.log(response);
    });
  }, []);

  async function handleAddProject() {
    //setState deve criar sempre um novo registro, nunca alterar o valor anterior.
    // por isso criei um novo array com todas as informacoes do antigo mais o novo projeto
    // Conceito de imultabilidade dos estados no react
    // setProjects([...projects, `Novo Projeto ${Date.now()}`]);

    const response = await api.post("patologia", {
      descricao: `testa add patologia pelo reactJs (${Date.now()})`,
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="projects" />

      {/* <img width={3000} src={bgImage} /> */}

      <ul>
        {projects.map((proj) => (
          <li key={proj.id}>{proj.descricao}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
