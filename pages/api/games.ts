import type { NextApiRequest, NextApiResponse } from 'next';
import igdb from '../../lib/igdb';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = JSON.parse(req.body);
  const games = await igdb.getGames(body.query);

  const queryCovers = games
    ? `where id = (${games
        ?.map((g) => g.cover)
        .filter((c) => !!c)
        .join(',')});`
    : '';

  const covers = await igdb.getCovers(queryCovers);

  res.status(200).json({ games, covers });
}
