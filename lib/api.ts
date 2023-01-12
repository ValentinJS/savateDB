import { ICover, IGame } from '../types';

export async function fetchGames(search?: string): Promise<{ games: IGame[]; covers: ICover[] }> {
  return fetch('api/games', {
    body: JSON.stringify({ query: search }),
    method: 'POST',
  }).then(async (res) => {
    return res.json().then((data) => {
      if (res.ok) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(data);
      }
    });
  });
}
