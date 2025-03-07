// spotifyClient.ts
import axios from 'axios';

// Інтерфейси для типізації даних
export interface SpotifyToken {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    duration_ms: number;
    track_number: number;
    explicit: boolean;
    artists: Array<{
        id: string;
        name: string;
    }>;
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    artists: Array<{
        id: string;
        name: string;
    }>;
    tracks: {
        items: SpotifyTrack[];
    };
}

class SpotifyClient {
    private clientId: string;
    private clientSecret: string;
    private accessToken: string | null = null;
    private tokenExpirationTime: number = 0;

    constructor() {
        // Отримуємо змінні середовища з Next.js
        this.clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
        this.clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || '';

        if (!this.clientId || !this.clientSecret) {
            console.error('Помилка: Відсутні змінні середовища для Spotify API');
        }
    }

    private async getAccessToken(): Promise<string> {
        // Перевіряємо, чи токен ще дійсний
        if (this.accessToken && Date.now() < this.tokenExpirationTime) {
            return this.accessToken;
        }

        try {
            // Запит на отримання токену
            const response = await axios({
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')
                },
                data: 'grant_type=client_credentials'
            });

            const data = response.data as SpotifyToken;
            this.accessToken = data.access_token;
            // Встановлюємо час закінчення токену (зменшуємо на 60 секунд для забезпечення безпеки)
            this.tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000;

            return this.accessToken;
        } catch (error) {
            console.error('Помилка при отриманні токену доступу:', error);
            throw new Error('Не вдалося отримати токен доступу');
        }
    }

    public async getAlbumTracks(albumId: string): Promise<SpotifyAlbum> {
        try {
            const token = await this.getAccessToken();

            const response = await axios({
                method: 'get',
                url: `https://api.spotify.com/v1/albums/${albumId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data as SpotifyAlbum;
        } catch (error) {
            console.error('Помилка при отриманні даних альбому:', error);
            throw new Error('Не вдалося отримати дані альбому');
        }
    }
}

export default SpotifyClient;