
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { boschService } from '@/services/boschService';
import { BoschDevice, DeviceService, Room, BoschEvent } from '@/types/bosch';
import { toast } from '@/hooks/use-toast';

export const useBoschSmartHome = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsAuthenticated(boschService.isAuthenticated());
  }, []);

  // Mutação para autenticação
  const authMutation = useMutation({
    mutationFn: (clientName: string) => boschService.authenticate(clientName),
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({
        title: "Conectado!",
        description: "Autenticação com Bosch Smart Home Controller realizada com sucesso.",
      });
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast({
        title: "Erro na autenticação",
        description: "Não foi possível conectar ao controlador.",
        variant: "destructive",
      });
    }
  });

  // Query para dispositivos
  const {
    data: devices = [],
    isLoading: devicesLoading,
    error: devicesError
  } = useQuery({
    queryKey: ['devices'],
    queryFn: () => boschService.getDevices(),
    enabled: isAuthenticated,
  });

  // Query para cômodos
  const {
    data: rooms = [],
    isLoading: roomsLoading
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => boschService.getRooms(),
    enabled: isAuthenticated,
  });

  // Query para estados dos dispositivos
  const {
    data: deviceStates = [],
    isLoading: statesLoading
  } = useQuery({
    queryKey: ['deviceStates'],
    queryFn: () => boschService.getAllDeviceStates(),
    enabled: isAuthenticated,
    refetchInterval: 10000, // Atualiza a cada 10 segundos
  });

  // Query para eventos
  const {
    data: events = [],
    isLoading: eventsLoading
  } = useQuery({
    queryKey: ['events'],
    queryFn: () => boschService.getEvents(20),
    enabled: isAuthenticated,
    refetchInterval: 5000, // Atualiza a cada 5 segundos
  });

  // Mutação para controlar dispositivos
  const controlMutation = useMutation({
    mutationFn: ({ deviceId, serviceId, command }: {
      deviceId: string;
      serviceId: string;
      command: any;
    }) => boschService.controlDevice(deviceId, serviceId, command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceStates'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Comando executado",
        description: "Dispositivo controlado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro no controle",
        description: "Não foi possível controlar o dispositivo.",
        variant: "destructive",
      });
    }
  });

  const disconnect = () => {
    boschService.disconnect();
    setIsAuthenticated(false);
    queryClient.clear();
    toast({
      title: "Desconectado",
      description: "Desconectado do Bosch Smart Home Controller.",
    });
  };

  return {
    // Estado
    isAuthenticated,
    
    // Dados
    devices,
    rooms,
    deviceStates,
    events,
    
    // Estados de loading
    devicesLoading,
    roomsLoading,
    statesLoading,
    eventsLoading,
    
    // Ações
    authenticate: authMutation.mutate,
    isAuthenticating: authMutation.isPending,
    controlDevice: controlMutation.mutate,
    isControlling: controlMutation.isPending,
    disconnect,
    
    // Erros
    devicesError
  };
};
