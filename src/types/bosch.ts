
export interface BoschDevice {
  '@type': string;
  rootDeviceId: string;
  id: string;
  deviceServiceIds: string[];
  manufacturer: string;
  roomId: string;
  deviceModel: string;
  serial: string;
  profile: string;
  name: string;
  status: 'AVAILABLE' | 'UNAVAILABLE';
  childDeviceIds: string[];
}

export interface DeviceService {
  '@type': string;
  id: string;
  deviceId: string;
  state: {
    '@type': string;
    [key: string]: any;
  };
  operations: string[];
  path: string;
}

export interface Room {
  '@type': string;
  id: string;
  iconId: string;
  name: string;
}

export interface BoschEvent {
  '@type': string;
  id: string;
  timestamp: number;
  sourceId: string;
  sourceType: string;
  data: any;
}

export interface AuthenticationState {
  isAuthenticated: boolean;
  clientId?: string;
  token?: string;
}
