import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars2.githubusercontent.com/u/6893004?s=400&u=8ecddc66048cb8a1813e1c480fd04af22ed6a047&v=4"
            alt="teste"
          />
          <div>
            <strong>ruannicolini/Sogym</strong>
            <p>descricao do repositorio</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>1808</strong>
            <span>Starts</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues abertos</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to={''}>
          <div>
            <strong>hsafjkdsf</strong>
            <p>sdfghjkjhg</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
