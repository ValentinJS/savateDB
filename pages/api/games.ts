import type { NextApiRequest, NextApiResponse } from 'next';
import igdb from '../../lib/igdb';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = JSON.parse(req.body);

  return igdb
    .getGames(body.query)
    .then(async (games) => {
      if (games.length === 0) {
        return { games, covers: [] };
      }

      const queryCovers = games
        ? `where id = (${games
            ?.map((g) => g.cover)
            .filter((c) => !!c)
            .join(',')});`
        : '';

      return igdb.getCovers(queryCovers).then((covers) => ({ games, covers }));
    })
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      return res.status(500).send({ message: error?.message });
    });
}
