import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';
import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no GitHub</Title>
            <Form>
                <input placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="teste">
                    <img
                        src="https://avatars2.githubusercontent.com/u/6893004?s=460&u=8ecddc66048cb8a1813e1c480fd04af22ed6a047&v=4"
                        alt="Ruan Nicolini"
                    />
                    <div>
                        <strong>BootNR</strong>
                        <p>
                            Repositório para estudo do NodeJs, React e React
                            Native
                        </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>

                <a href="teste">
                    <img
                        src="https://avatars2.githubusercontent.com/u/6893004?s=460&u=8ecddc66048cb8a1813e1c480fd04af22ed6a047&v=4"
                        alt="Ruan Nicolini"
                    />
                    <div>
                        <strong>BootNR</strong>
                        <p>
                            Repositório para estudo do NodeJs, React e React
                            Native
                        </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>

                <a href="teste">
                    <img
                        src="https://avatars2.githubusercontent.com/u/6893004?s=460&u=8ecddc66048cb8a1813e1c480fd04af22ed6a047&v=4"
                        alt="Ruan Nicolini"
                    />
                    <div>
                        <strong>BootNR</strong>
                        <p>
                            Repositório para estudo do NodeJs, React e React
                            Native
                        </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
            </Repositories>

            <Repositories></Repositories>
        </>
    );
};

export default Dashboard;
