
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, Wifi } from 'lucide-react';

interface AuthCardProps {
  onAuthenticate: (clientName: string) => void;
  isAuthenticating: boolean;
}

export const AuthCard = ({ onAuthenticate, isAuthenticating }: AuthCardProps) => {
  const [clientName, setClientName] = useState('Aplicação Web Demo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticate(clientName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Home className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Bosch Smart Home</CardTitle>
          <CardDescription>
            Conecte-se ao Smart Home Controller para controlar seus dispositivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Nome do cliente</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nome da sua aplicação"
                required
              />
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Wifi className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Simulação de API</p>
                  <p>Esta é uma simulação da API do Bosch Smart Home Controller com dados fictícios.</p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? 'Conectando...' : 'Conectar ao Controlador'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
