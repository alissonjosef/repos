import { useState } from "react";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import api from "../../server/api";
import {
  Container,
  Owner,
  Loanding,
  BackButton,
  IssusList,
  PageAction,
  FilterLister,
} from "./styles";

export function Repositore() {
  const params = useParams();
  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loanding, setLoanding] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {
      state: "open",
      label: "Aberta",
      active: false,
    },
    {
      state: "all",
      label: "Todoas",
      active: true,
    },
    {
      state: "closed",
      label: "Fechada",
      active: false,
    },
  ]);

  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const nomeRepo = params.repositorio;

      const [resitorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find((f) => f.active).state,
            per_page: 5,
          },
        }),
      ]);
      setRepositorio(resitorioData.data);
      setIssues(issuesData.data);
      setLoanding(false);
    }

    load();
  }, [params.repositorio, filters]);

  useEffect(() => {
    async function loadIssues() {
      const nomeRepo = params.repositorio;

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 23,
        },
      });
      setIssues(response.data);
    }

    loadIssues();
  }, [params.repositorio, filters, filterIndex, page]);

  function nextPages(action) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

  if (loanding) {
    return (
      <Loanding>
        <h1>Carregando...</h1>
      </Loanding>
    );
  }

  return (
    <Container>
      <BackButton>
        <Link to="/">
          <FaArrowLeft size={30} color="black" />
        </Link>
      </BackButton>
      <Owner>
        <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />

        <h1>{repositorio.name}</h1>
        <p>{repositorio.description}</p>
      </Owner>

      <FilterLister active={filterIndex}>
        {filters.map((filtro, index) => (
          <button
            key={filtro.label}
            onClick={() => handleFilter(index)}
            type="button"
            value={filtro.state}
          >
            {filtro.label}
          </button>
        ))}
      </FilterLister>

      <IssusList>
        {issues.map((issue) => (
          <li key={issue.id}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssusList>
      <PageAction>
        <button
          disabled={page < 2}
          type="buttom"
          onClick={() => nextPages("back")}
        >
          Voltar
        </button>
        <button
          disabled={page > page.length}
          type="buttom"
          onClick={() => nextPages("next")}
        >
          Avançar
        </button>
      </PageAction>
    </Container>
  );
}
