
import { WeatherData } from '@/types/weather';

const API_KEY = 'your-api-key-here'; // Usuário precisa inserir sua chave da WeatherAPI
const BASE_URL = 'https://api.weatherapi.com/v1';

export const weatherService = {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar dados climáticos');
    }
    
    return response.json();
  },

  async getForecast(city: string, days: number = 3): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar previsão do tempo');
    }
    
    return response.json();
  }
};
