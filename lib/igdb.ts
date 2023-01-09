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

  public async getGames(query?: string): Promise<IGame[]> {
    const res = await fetch('https://api.igdb.com/v4/games', {
      headers: await this.getHeaders(),
      method: 'POST',
      body: `${query ? query : ''} fields *;`,
    });

    return res.json();
  }

  public async getCovers(query?: string): Promise<ICover[]> {
    const res = await fetch('https://api.igdb.com/v4/covers', {
      headers: await this.getHeaders(),
      method: 'POST',
      body: `${query ? query : ''} fields *;`,
    });
    return res.json();
  }

  public static getInstance(): GetToken {
    if (!GetToken.instance) {
      GetToken.instance = new GetToken();
    }

    return GetToken.instance;
  }
}

export default GetToken.getInstance();
