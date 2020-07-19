import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

// Nao possuem valor semantico
// Nao possuem estilizacao própria
// Todos componentes possuem por padrão "display: flex"

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("patologia").then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("patologia", {
      descricao: `patologia teste ${Date.now()}`,
    });
    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.containerFlatList}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item }) => (
            <Text style={styles.project}>{item.descricao}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    justifyContent: "center",
    alignItems: "center",
  },
  containerFlatList: {
    flex: 1,
    backgroundColor: "#7159c1",
    // justifyContent: "center", // FlatList nao utiliza
    // alignItems: "center", // FlatList nao utiliza
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  project: {
    color: "#000",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
