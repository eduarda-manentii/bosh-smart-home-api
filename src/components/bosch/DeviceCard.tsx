
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BoschDevice, DeviceService } from '@/types/bosch';
import { 
  Lightbulb, 
  Thermometer, 
  Blinds, 
  Power,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface DeviceCardProps {
  device: BoschDevice;
  deviceState?: DeviceService;
  onControl: (deviceId: string, serviceId: string, command: any) => void;
  isControlling: boolean;
}

export const DeviceCard = ({ device, deviceState, onControl, isControlling }: DeviceCardProps) => {
  const getDeviceIcon = () => {
    switch (device.deviceServiceIds[0]) {
      case 'PowerSwitch':
        return <Lightbulb className="w-5 h-5" />;
      case 'TemperatureLevel':
        return <Thermometer className="w-5 h-5" />;
      case 'ShutterControl':
        return <Blinds className="w-5 h-5" />;
      default:
        return <Power className="w-5 h-5" />;
    }
  };

  const getDeviceStatus = () => {
    if (!deviceState) return 'Carregando...';
    
    switch (deviceState.id) {
      case 'PowerSwitch':
        const isOn = deviceState.state.switchState === 'ON';
        return isOn ? 'Ligado' : 'Desligado';
      case 'TemperatureLevel':
        return `${deviceState.state.temperature}°C`;
      case 'ShutterControl':
        const level = Math.round(deviceState.state.level * 100);
        return `${level}% ${deviceState.state.operationState}`;
      default:
        return 'Desconhecido';
    }
  };

  const renderControls = () => {
    if (!deviceState) return null;

    switch (deviceState.id) {
      case 'PowerSwitch':
        const isOn = deviceState.state.switchState === 'ON';
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={isOn}
              onCheckedChange={(checked) => 
                onControl(device.id, 'PowerSwitch', { switchState: checked ? 'ON' : 'OFF' })
              }
              disabled={isControlling}
            />
            <span className="text-sm">{isOn ? 'Ligado' : 'Desligado'}</span>
          </div>
        );

      case 'ShutterControl':
        return (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onControl(device.id, 'ShutterControl', { level: 0 })}
              disabled={isControlling}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onControl(device.id, 'ShutterControl', { level: 0.5 })}
              disabled={isControlling}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onControl(device.id, 'ShutterControl', { level: 1 })}
              disabled={isControlling}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        );

      case 'TemperatureLevel':
        return (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Sensor (somente leitura)</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          {getDeviceIcon()}
          <span>{device.name}</span>
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{device.deviceModel}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            device.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {device.status === 'AVAILABLE' ? 'Online' : 'Offline'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm">
            <span className="font-medium">Status: </span>
            <span>{getDeviceStatus()}</span>
          </div>
          {renderControls()}
        </div>
      </CardContent>
    </Card>
  );
};
