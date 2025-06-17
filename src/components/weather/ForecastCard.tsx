
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/types/weather';

interface ForecastCardProps {
  weather: WeatherData;
}

export const ForecastCard = ({ weather }: ForecastCardProps) => {
  if (!weather.forecast) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previsão dos Próximos Dias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weather.forecast.forecastday.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img 
                  src={day.day.condition.icon} 
                  alt={day.day.condition.text}
                  className="w-10 h-10"
                />
                <div>
                  <div className="font-medium">
                    {new Date(day.date).toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {day.day.condition.text}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">
                  {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                </div>
                <div className="text-sm text-blue-600">
                  {day.day.chance_of_rain}% chuva
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
