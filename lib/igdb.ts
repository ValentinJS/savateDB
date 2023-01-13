import { ICover, IGame, IToken } from '../types';

class GetToken {
  private static instance: GetToken;
  private token: IToken | null;

  constructor() {
    this.token = null;
    this.getToken();
  }

  private hasToken() {
    return this.token?.expires_in && this.token?.expires_in > 0;
  }

  private async refreshToken() {
    const res = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
      { method: 'POST' }
    );
    this.token = await res.json();
    return this.token;
  }

  private async getToken() {
    if (this.hasToken()) {
      return this.token;
    }
    return this.refreshToken();
  }

  private async getHeaders() {
    const token = await this.getToken();

    return {
      Accept: 'application/json',
      'Client-ID': process.env.CLIENT_ID!,
      Authorization: `Bearer ${token?.access_token}`,
    };
  }

  // TODO: Use https://github.com/twitchtv/node-apicalypse ?
  public async getGames(query?: string): Promise<IGame[]> {
    return fetch('https://api.igdb.com/v4/games', {
      headers: await this.getHeaders(),
      method: 'POST',
      body: `fields *; where version_parent = null & parent_game = null${
        query ? `& name ~ *"${query}"*;` : '& rating > 96 & cover != null; sort first_release_date desc'
      };`,
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error calling IGDB '/games'${query ? ` with query ${query}` : ''}: ${res.status} ${res.statusText}`
        );
      }
      return res.json();
    });
  }

  public async getCovers(ids: number[]): Promise<ICover[]> {
    const query = `where id = (${ids.filter((c) => !!c).join(',')});`;

    return fetch('https://api.igdb.com/v4/covers', {
      headers: await this.getHeaders(),
      method: 'POST',
      body: `${query} fields *;`,
    }).then((res) => {
      if (!res.ok) {
        throw `Error calling IGDB '/covers'${query ? ` with query ${query}` : ''}: ${res.status} ${res.statusText}`;
      }
      return res.json();
    });
  }

  public static getInstance(): GetToken {
    if (!GetToken.instance) {
      GetToken.instance = new GetToken();
    }

    return GetToken.instance;
  }
}

export default GetToken.getInstance();
