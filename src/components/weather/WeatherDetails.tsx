
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/types/weather';

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const details = [
    {
      label: 'Umidade',
      value: `${weather.current.humidity}%`,
      icon: '💧'
    },
    {
      label: 'Vento',
      value: `${weather.current.wind_kph} km/h`,
      direction: weather.current.wind_dir,
      icon: '💨'
    },
    {
      label: 'Pressão',
      value: `${weather.current.pressure_mb} mb`,
      icon: '🌡️'
    },
    {
      label: 'Visibilidade',
      value: `${weather.current.vis_km} km`,
      icon: '👁️'
    },
    {
      label: 'Índice UV',
      value: weather.current.uv.toString(),
      icon: '☀️'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Clima</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {details.map((detail, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl mb-1">{detail.icon}</div>
              <div className="font-medium text-sm">{detail.label}</div>
              <div className="text-lg font-bold">
                {detail.value}
                {detail.direction && (
                  <span className="text-sm font-normal ml-1">
                    {detail.direction}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
