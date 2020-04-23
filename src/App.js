import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([
    {
      title: 'Desafio ReactJS',
      url: 'https://www.github.com/march0514s',
      techs: 'ReactJS',
    },
  ]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post('repositories', {
        id: 1,
        title: `Novo projeto ${Date.now()}`,
        url: 'http://www.github.com/march0514s',
        techs: 'ReactJS',
      })
      .then((response) => setRepositories([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then(setRepositories(repositories.filter((repo) => repo.id !== id)));
  }

  // console.log(repositories);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
