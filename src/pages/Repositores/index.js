import { useState } from "react";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import api from "../../server/api";
import { Container, Owner, Loanding, BackButton, IssusList } from "./styles";

export function Repositore() {
  const params = useParams();
  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loanding, setLoanding] = useState(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = params.repositorio;

      const [resitorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);
      setRepositorio(resitorioData.data);
      setIssues(issuesData.data);
      console.log("🚀 ~ file: index.js ~ line 29 ~ load ~ issuesData.data", issuesData.data)
      setLoanding(false);
    }

    load();
  }, [params.repositorio]);

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

      <IssusList>
        {issues.map((issue) => (
        
          <li key={issue.id}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {
                    issue.labels.map(label =>  (
                        <span key={String(label.id)}>{label.name}</span>
                    ))
                }
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssusList>
    </Container>
  );
}
