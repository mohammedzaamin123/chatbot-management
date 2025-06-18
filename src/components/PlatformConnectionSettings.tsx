
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trash2, Settings, Globe, MessageSquare, Link } from 'lucide-react';

interface PlatformConnectionSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  platforms: any[];
  onUpdatePlatforms: (platforms: any[]) => void;
}

const platformOptions = [
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, fields: ['webhook', 'phone_number'] },
  { value: 'telegram', label: 'Telegram', icon: MessageSquare, fields: ['webhook', 'bot_token'] },
  { value: 'instagram', label: 'Instagram', icon: MessageSquare, fields: ['webhook', 'api_token'] },
  { value: 'facebook', label: 'Facebook', icon: MessageSquare, fields: ['webhook', 'api_token'] },
  { value: 'discord', label: 'Discord', icon: MessageSquare, fields: ['webhook', 'bot_token'] },
  { value: 'slack', label: 'Slack', icon: MessageSquare, fields: ['webhook', 'bot_token'] },
  { value: 'website', label: 'Website Widget', icon: Globe, fields: ['webhook'] }
];

export const PlatformConnectionSettings: React.FC<PlatformConnectionSettingsProps> = ({
  isOpen,
  onClose,
  platforms,
  onUpdatePlatforms
}) => {
  const updatePlatform = (index: number, field: string, value: any) => {
    const updatedPlatforms = platforms.map((platform, i) => 
      i === index ? { ...platform, [field]: value } : platform
    );
    onUpdatePlatforms(updatedPlatforms);
  };

  const updatePlatformWebhook = (index: number, webhookField: string, value: any) => {
    const updatedPlatforms = platforms.map((platform, i) => 
      i === index 
        ? { 
            ...platform, 
            webhook: { 
              ...platform.webhook, 
              [webhookField]: value 
            } 
          } 
        : platform
    );
    onUpdatePlatforms(updatedPlatforms);
  };

  const removePlatform = (index: number) => {
    const updatedPlatforms = platforms.filter((_, i) => i !== index);
    onUpdatePlatforms(updatedPlatforms);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Platform Connection Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {platforms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No platforms selected yet. Go back and select platforms to configure.</p>
            </div>
          ) : (
            platforms.map((platform, index) => (
              <Card key={index} className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      {platformOptions.find(p => p.value === platform.platform)?.label || platform.platform}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePlatform(index)}
                      className="glass border-white/20 hover:border-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <Label>Webhook URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={platform.webhook?.url || ''}
                        onChange={(e) => updatePlatformWebhook(index, 'url', e.target.value)}
                        placeholder="https://your-domain.com/webhook"
                        className="glass border-white/20 flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updatePlatformWebhook(index, 'enabled', !platform.webhook?.enabled)}
                        className={`glass border-white/20 ${platform.webhook?.enabled ? 'bg-green-500/20' : ''}`}
                      >
                        <Link className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {platformOptions.find(p => p.value === platform.platform)?.fields.includes('phone_number') && (
                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          value={platform.phone_number || ''}
                          onChange={(e) => updatePlatform(index, 'phone_number', e.target.value)}
                          placeholder="+1234567890"
                          className="glass border-white/20"
                        />
                      </div>
                    )}

                    {platformOptions.find(p => p.value === platform.platform)?.fields.includes('bot_token') && (
                      <div>
                        <Label>Bot Token</Label>
                        <Input
                          value={platform.bot_token || ''}
                          onChange={(e) => updatePlatform(index, 'bot_token', e.target.value)}
                          placeholder="Enter bot token"
                          className="glass border-white/20"
                          type="password"
                        />
                      </div>
                    )}

                    {platformOptions.find(p => p.value === platform.platform)?.fields.includes('api_token') && (
                      <div>
                        <Label>API Token</Label>
                        <Input
                          value={platform.api_token || ''}
                          onChange={(e) => updatePlatform(index, 'api_token', e.target.value)}
                          placeholder="Enter API token"
                          className="glass border-white/20"
                          type="password"
                        />
                      </div>
                    )}

                    {platform.webhook?.url && (
                      <div>
                        <Label>Webhook Secret (Optional)</Label>
                        <Input
                          value={platform.webhook?.secret || ''}
                          onChange={(e) => updatePlatformWebhook(index, 'secret', e.target.value)}
                          placeholder="Enter webhook secret"
                          className="glass border-white/20"
                          type="password"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={platform.webhook?.enabled || false}
                      onCheckedChange={(checked) => updatePlatformWebhook(index, 'enabled', checked)}
                    />
                    <Label className="text-sm">Enable webhook for this platform</Label>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
