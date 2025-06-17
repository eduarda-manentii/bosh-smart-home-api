
import { BoschDevice, DeviceService, Room, BoschEvent, AuthenticationState } from '@/types/bosch';
import { mockRooms, mockDevices, initialDeviceServices, mockEvents } from '@/data/mockBoschData';

class BoschSmartHomeService {
  private devices: BoschDevice[] = [...mockDevices];
  private deviceServices: DeviceService[] = [...initialDeviceServices];
  private rooms: Room[] = [...mockRooms];
  private events: BoschEvent[] = [...mockEvents];
  private authState: AuthenticationState = { isAuthenticated: false };

  // Simula o processo de pairing/autenticação
  async authenticate(clientName: string): Promise<{ success: boolean; clientId?: string; token?: string }> {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const clientId = `client_${Date.now()}`;
    const token = `token_${Math.random().toString(36).substr(2, 9)}`;
    
    this.authState = {
      isAuthenticated: true,
      clientId,
      token
    };

    console.log('🔐 Autenticação simulada com sucesso:', { clientId, token });
    
    return {
      success: true,
      clientId,
      token
    };
  }

  // Verifica se está autenticado
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  // Desconecta
  disconnect(): void {
    this.authState = { isAuthenticated: false };
    console.log('🔌 Desconectado do Bosch Smart Home Controller');
  }

  // Lista todos os dispositivos
  async getDevices(): Promise<BoschDevice[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('📱 Buscando dispositivos...', this.devices);
    return [...this.devices];
  }

  // Lista todos os cômodos
  async getRooms(): Promise<Room[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.rooms];
  }

  // Obtém serviços de um dispositivo específico
  async getDeviceServices(deviceId: string): Promise<DeviceService[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.deviceServices.filter(service => service.deviceId === deviceId);
  }

  // Controla um dispositivo
  async controlDevice(deviceId: string, serviceId: string, command: any): Promise<boolean> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const serviceIndex = this.deviceServices.findIndex(
      service => service.deviceId === deviceId && service.id === serviceId
    );

    if (serviceIndex === -1) {
      throw new Error('Serviço não encontrado');
    }

    // Atualiza o estado do dispositivo
    this.deviceServices[serviceIndex].state = {
      ...this.deviceServices[serviceIndex].state,
      ...command
    };

    // Adiciona evento ao histórico
    const event: BoschEvent = {
      '@type': 'DeviceServiceData',
      id: `event_${Date.now()}`,
      timestamp: Date.now(),
      sourceId: deviceId,
      sourceType: 'DEVICE',
      data: command
    };
    this.events.unshift(event);

    console.log('🎛️ Dispositivo controlado:', { deviceId, serviceId, command });
    return true;
  }

  // Obtém histórico de eventos
  async getEvents(limit: number = 10): Promise<BoschEvent[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.events.slice(0, limit);
  }

  // Obtém estado atual de todos os dispositivos
  async getAllDeviceStates(): Promise<DeviceService[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Não autenticado');
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.deviceServices];
  }
}

export const boschService = new BoschSmartHomeService();
