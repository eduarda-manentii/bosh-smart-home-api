
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BoschEvent } from '@/types/bosch';
import { Clock, Zap } from 'lucide-react';

interface EventsListProps {
  events: BoschEvent[];
}

export const EventsList = ({ events }: EventsListProps) => {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins}min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays}d atrás`;
  };

  const getEventDescription = (event: BoschEvent) => {
    const deviceId = event.sourceId.split(':').pop()?.substring(0, 8) || 'Dispositivo';
    
    if (event.data.switchState) {
      return `Luz ${event.data.switchState === 'ON' ? 'ligada' : 'desligada'}`;
    }
    
    if (event.data.temperature) {
      return `Temperatura: ${event.data.temperature}°C`;
    }
    
    if (event.data.level !== undefined) {
      const level = Math.round(event.data.level * 100);
      return `Persiana: ${level}%`;
    }
    
    return 'Evento do dispositivo';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Eventos Recentes</span>
        </CardTitle>
        <CardDescription>
          Últimas atividades dos dispositivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Nenhum evento registrado
          </p>
        ) : (
          <div className="space-y-3">
            {events.slice(0, 10).map(event => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <Zap className="w-4 h-4 text-blue-500 mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(event.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
