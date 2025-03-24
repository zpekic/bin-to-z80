
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface SettingsProps {
  originAddress: number;
  setOriginAddress: (address: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ originAddress, setOriginAddress }) => {
  const [addressInput, setAddressInput] = useState(originAddress.toString(16).toUpperCase());
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9A-Fa-f]/g, '');
    setAddressInput(value.toUpperCase());
    const parsedValue = parseInt(value, 16);
    if (!isNaN(parsedValue)) {
      setOriginAddress(parsedValue);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Disassembly Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="originAddress">Origin Address (hex)</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="originAddress"
              value={addressInput}
              onChange={handleAddressChange}
              className="font-mono"
              placeholder="0000"
              maxLength={4}
            />
            <span className="text-sm text-muted-foreground">
              {originAddress.toString(16).toUpperCase().padStart(4, '0')}h
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
