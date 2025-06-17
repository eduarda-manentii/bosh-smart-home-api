
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { weatherService } from '@/services/weatherService';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { WeatherDetails } from '@/components/weather/WeatherDetails';
import { ForecastCard } from '@/components/weather/ForecastCard';
import { SearchWeather } from '@/components/weather/SearchWeather';
import { WeatherData } from '@/types/weather';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('São Paulo');

  const { data: weatherData, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', selectedCity],
    queryFn: () => weatherService.getForecast(selectedCity, 3),
    enabled: !!selectedCity,
    retry: false,
  });

  const handleSearch = (city: string) => {
    setSelectedCity(city);
    refetch();
  };

  if (error) {
    toast({
      title: "Erro ao carregar dados",
      description: "Verifique se você configurou a API key corretamente. Você precisa de uma chave da WeatherAPI (weatherapi.com).",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Climático
          </h1>
          <p className="text-lg text-gray-600">
            Informações meteorológicas em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <SearchWeather onSearch={handleSearch} loading={isLoading} />
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dados climáticos...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Configuração Necessária
              </h3>
              <p className="text-red-600 mb-4">
                Para usar este dashboard, você precisa:
              </p>
              <ol className="text-left text-red-600 space-y-1">
                <li>1. Criar uma conta em weatherapi.com</li>
                <li>2. Obter sua API key gratuita</li>
                <li>3. Substituir 'your-api-key-here' no arquivo weatherService.ts</li>
              </ol>
            </div>
          </div>
        )}

        {weatherData && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <WeatherCard weather={weatherData} />
              <WeatherDetails weather={weatherData} />
            </div>
            <div>
              <ForecastCard weather={weatherData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
