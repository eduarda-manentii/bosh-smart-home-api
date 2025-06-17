
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeviceCard } from './DeviceCard';
import { EventsList } from './EventsList';
import { useBoschSmartHome } from '@/hooks/useBoschSmartHome';
import { 
  Home, 
  Smartphone, 
  LogOut, 
  Activity,
  Loader2
} from 'lucide-react';

export const Dashboard = () => {
  const {
    isAuthenticated,
    devices,
    rooms,
    deviceStates,
    events,
    devicesLoading,
    controlDevice,
    isControlling,
    disconnect
  } = useBoschSmartHome();

  if (!isAuthenticated) {
    return null;
  }

  const getDevicesByRoom = () => {
    const devicesByRoom: { [roomId: string]: typeof devices } = {};
    
    devices.forEach(device => {
      if (!devicesByRoom[device.roomId]) {
        devicesByRoom[device.roomId] = [];
      }
      devicesByRoom[device.roomId].push(device);
    });
    
    return devicesByRoom;
  };

  const getRoomName = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room?.name || roomId;
  };

  const getDeviceState = (deviceId: string) => {
    return deviceStates.find(state => state.deviceId === deviceId);
  };

  const handleDeviceControl = (deviceId: string, serviceId: string, command: any) => {
    controlDevice({ deviceId, serviceId, command });
  };

  const devicesByRoom = getDevicesByRoom();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Bosch Smart Home
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Conectado</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={disconnect}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Desconectar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dispositivos */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Dispositivos</h2>
            </div>

            {devicesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-600">Carregando dispositivos...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(devicesByRoom).map(([roomId, roomDevices]) => (
                  <div key={roomId}>
                    <h3 className="text-md font-medium text-gray-700 mb-3">
                      {getRoomName(roomId)}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roomDevices.map(device => (
                        <DeviceCard
                          key={device.id}
                          device={device}
                          deviceState={getDeviceState(device.id)}
                          onControl={handleDeviceControl}
                          isControlling={isControlling}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Painel lateral */}
          <div className="space-y-6">
            {/* Resumo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Resumo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Dispositivos</span>
                    <span className="font-medium">{devices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cômodos</span>
                    <span className="font-medium">{rooms.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Online</span>
                    <span className="font-medium text-green-600">
                      {devices.filter(d => d.status === 'AVAILABLE').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eventos recentes */}
            <EventsList events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};
