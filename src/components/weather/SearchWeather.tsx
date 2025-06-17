
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchWeatherProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchWeather = ({ onSearch, loading }: SearchWeatherProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const popularCities = [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza',
    'Londres', 'Nova York', 'Tóquio', 'Paris', 'Madrid'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscar Clima</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Digite o nome da cidade..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            <Search className="w-4 h-4" />
          </Button>
        </form>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Cidades populares:</p>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((popularCity) => (
              <Button
                key={popularCity}
                variant="outline"
                size="sm"
                onClick={() => onSearch(popularCity)}
                disabled={loading}
              >
                {popularCity}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
