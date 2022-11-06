import { Container, SubmitButton, Form, List, DeleteButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { useState, useCallback } from "react";
import api from "../../server/api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([
    { name: "alissonjosef/copamobile" },
    { name: "angular/angular" },
    { name: "facebook/react" },
    { name: "vuejs/vue" },
    { name: "flutter/flutter" },
  ]);
  const [loading, setLoading] = useState(false);
  const [alertToast, setAlertToast] = useState(null);

  useEffect(() => {
    const repoStorge = localStorage.getItem("repos");
    if (repoStorge) {
      setRepositorios(JSON.parse(repoStorge));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      async function submit() {
        setLoading(true);
        setAlertToast(null);
        try {
          if (newRepo === "") {
            return alert("Você precisa indicar um repositorio!");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorios.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            return alert("Repositorio duplicado");
          }

          const data = {
            name: response.data.full_name,
          };

          if (newRepo === repositorios) {
            return alert("Repositorio ja Existe");
          }
          localStorage.setItem("repos", JSON.stringify(repositorios));
          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          setAlertToast(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [repositorios, newRepo]
  );

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorios.filter((r) => r.name !== repo);

      setRepositorios(find);
    },
    [repositorios]
  );

  function handleInputChange(event) {
    setNewRepo(event.target.value);
    setAlertToast(null);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositores
      </h1>

      <Form onSubmit={handleSubmit} error={alertToast}>
        <input
          value={newRepo}
          onChange={handleInputChange}
          type="text"
          placeholder="Adicionar Repodiotorios"
        />

        <SubmitButton Loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="white" size={14} />
          ) : (
            <FaPlus color="white" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton
                onClick={() => {
                  handleDelete(repo.name);
                }}
              >
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
