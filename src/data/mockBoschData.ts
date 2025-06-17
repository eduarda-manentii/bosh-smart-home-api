
import { BoschDevice, DeviceService, Room, BoschEvent } from '@/types/bosch';

export const mockRooms: Room[] = [
  {
    '@type': 'room',
    id: 'hz_1',
    iconId: 'icon_room_living_room',
    name: 'Sala de Estar'
  },
  {
    '@type': 'room',
    id: 'hz_2',
    iconId: 'icon_room_kitchen',
    name: 'Cozinha'
  },
  {
    '@type': 'room',
    id: 'hz_3',
    iconId: 'icon_room_bedroom',
    name: 'Quarto'
  }
];

export const mockDevices: BoschDevice[] = [
  {
    '@type': 'device',
    rootDeviceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8A9',
    id: 'hdm:HomeMaticIP:3014F711A0001916D859A8A9',
    deviceServiceIds: ['PowerSwitch'],
    manufacturer: 'BOSCH',
    roomId: 'hz_1',
    deviceModel: 'BSH-LI100',
    serial: '3014F711A0001916D859A8A9',
    profile: 'GENERIC',
    name: 'Luz da Sala',
    status: 'AVAILABLE',
    childDeviceIds: []
  },
  {
    '@type': 'device',
    rootDeviceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8B0',
    id: 'hdm:HomeMaticIP:3014F711A0001916D859A8B0',
    deviceServiceIds: ['TemperatureLevel'],
    manufacturer: 'BOSCH',
    roomId: 'hz_2',
    deviceModel: 'BSH-TS100',
    serial: '3014F711A0001916D859A8B0',
    profile: 'GENERIC',
    name: 'Sensor de Temperatura',
    status: 'AVAILABLE',
    childDeviceIds: []
  },
  {
    '@type': 'device',
    rootDeviceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8C1',
    id: 'hdm:HomeMaticIP:3014F711A0001916D859A8C1',
    deviceServiceIds: ['ShutterControl'],
    manufacturer: 'BOSCH',
    roomId: 'hz_3',
    deviceModel: 'BSH-SC100',
    serial: '3014F711A0001916D859A8C1',
    profile: 'GENERIC',
    name: 'Persiana do Quarto',
    status: 'AVAILABLE',
    childDeviceIds: []
  }
];

export const initialDeviceServices: DeviceService[] = [
  {
    '@type': 'PowerSwitchState',
    id: 'PowerSwitch',
    deviceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8A9',
    state: {
      '@type': 'powerSwitchState',
      switchState: 'OFF'
    },
    operations: ['switchState'],
    path: '/devices/hdm:HomeMaticIP:3014F711A0001916D859A8A9/services/PowerSwitch'
  },
  {
    '@type': 'TemperatureLevelState',
    id: 'TemperatureLevel',
    deviceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8B0',
    state: {
      '@type': 'temperatureLevelState',
      temperature: 22.5
    },
    operations: [],
    path: '/devices/hdm:HomeMaticIP:3014F711A0001916D859A8B0/services/TemperatureLevel'
  },
  {
    '@type': 'ShutterControlState',
    id: 'ShutterControl',
    deviceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8C1',
    state: {
      '@type': 'shutterControlState',
      level: 0.5,
      operationState: 'STOPPED'
    },
    operations: ['level'],
    path: '/devices/hdm:HomeMaticIP:3014F711A0001916D859A8C1/services/ShutterControl'
  }
];

export const mockEvents: BoschEvent[] = [
  {
    '@type': 'DeviceServiceData',
    id: 'event_1',
    timestamp: Date.now() - 300000,
    sourceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8A9',
    sourceType: 'DEVICE',
    data: { switchState: 'ON' }
  },
  {
    '@type': 'DeviceServiceData',
    id: 'event_2',
    timestamp: Date.now() - 600000,
    sourceId: 'hdm:HomeMaticIP:3014F711A0001916D859A8B0',
    sourceType: 'DEVICE',
    data: { temperature: 21.8 }
  }
];
