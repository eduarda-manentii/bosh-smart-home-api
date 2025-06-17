
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{weather.location.name}</span>
          <span className="text-sm text-muted-foreground">
            {weather.location.country}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={weather.current.condition.icon} 
              alt={weather.current.condition.text}
              className="w-16 h-16"
            />
            <div>
              <div className="text-3xl font-bold">
                {Math.round(weather.current.temp_c)}°C
              </div>
              <div className="text-sm text-muted-foreground">
                Sensação: {Math.round(weather.current.feelslike_c)}°C
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{weather.current.condition.text}</div>
            <div className="text-sm text-muted-foreground">
              {new Date(weather.location.localtime).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
