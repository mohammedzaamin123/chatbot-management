
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Database, Plus, TestTube } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { DatabaseConnection } from '../../store/useStore';

interface DatabaseConnectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseConnectionPopup: React.FC<DatabaseConnectionPopupProps> = ({
  isOpen,
  onClose
}) => {
  const { addDatabase } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    type: 'postgresql' as DatabaseConnection['type'],
    host: '',
    port: '',
    database: '',
    username: '',
    password: ''
  });

  const [isConnecting, setIsConnecting] = useState(false);

  const handleTestConnection = async () => {
    setIsConnecting(true);
    
    // Simulate connection test
    setTimeout(() => {
      setIsConnecting(false);
      // For demo purposes, we'll assume success
      alert('Connection test successful!');
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addDatabase({
      name: formData.name,
      type: formData.type,
      status: 'connected',
      collections: ['users', 'orders', 'products'], // Sample collections
      last_sync: new Date().toISOString()
    });
    
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Add Database Connection"
      description="Connect to your database to enable AI-powered data operations"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Connection Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My Database"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Database Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: DatabaseConnection['type']) => 
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
                <SelectItem value="airtable">Airtable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {formData.type !== 'airtable' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  placeholder="localhost"
                  required
                />
              </div>

              <div>
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                  placeholder="5432"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="database">Database Name</Label>
              <Input
                id="database"
                value={formData.database}
                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                placeholder="myapp_db"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="db_user"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </>
        )}

        {formData.type === 'airtable' && (
          <div>
            <Label htmlFor="api_key">API Key</Label>
            <Input
              id="api_key"
              type="password"
              placeholder="Enter your Airtable API key"
              required
            />
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleTestConnection}
            disabled={isConnecting}
            className="flex-1"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Testing...
              </>
            ) : (
              <>
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </>
            )}
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="btn-primary">
            <Database className="w-4 h-4 mr-2" />
            Add Connection
          </Button>
        </div>
      </form>
    </Popup>
  );
};
