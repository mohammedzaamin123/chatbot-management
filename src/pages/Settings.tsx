
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Key, Users, Palette, Bell, Shield, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';

export const Settings: React.FC = () => {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    claude: '',
    gemini: '',
    meta: '',
    google: '',
    twilio: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">
            Settings ⚙️
          </h1>
          <p className="text-lg text-muted-foreground">
            Configure your platform settings and integrations
          </p>
        </div>
        
        <Button className="btn-primary">
          Save Changes
        </Button>
      </motion.div>

      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 glass">
          <TabsTrigger value="api-keys" className="data-[state=active]:bg-neon-gradient">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-neon-gradient">
            <Users className="w-4 h-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-neon-gradient">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-neon-gradient">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-neon-gradient">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-neon-gradient">
            <Globe className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-6">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>API Keys & Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'openai', label: 'OpenAI API Key', placeholder: 'sk-...' },
                  { key: 'claude', label: 'Anthropic API Key', placeholder: 'sk-ant-...' },
                  { key: 'gemini', label: 'Google Gemini API Key', placeholder: 'AI...' },
                  { key: 'meta', label: 'Meta Business API Key', placeholder: 'EAA...' },
                  { key: 'google', label: 'Google Ads API Key', placeholder: 'ya29...' },
                  { key: 'twilio', label: 'Twilio API Key', placeholder: 'AC...' }
                ].map((api) => (
                  <div key={api.key}>
                    <Label>{api.label}</Label>
                    <Input
                      type="password"
                      value={apiKeys[api.key]}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, [api.key]: e.target.value }))}
                      placeholder={api.placeholder}
                      className="glass border-white/20"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Alex Rodriguez', email: 'alex@chronosync.ai', role: 'Admin' },
                { name: 'Sarah Johnson', email: 'sarah@chronosync.ai', role: 'Editor' },
                { name: 'Mike Chen', email: 'mike@chronosync.ai', role: 'Viewer' }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{member.role}</span>
                    <Button size="sm" variant="outline" className="glass border-white/20">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full glass border-white/20 border-dashed">
                + Invite Team Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Dark Mode</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Compact Mode</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Animations</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div>
                <Label>Theme Color</Label>
                <div className="flex gap-3 mt-2">
                  {['purple', 'blue', 'green', 'pink', 'yellow'].map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-lg bg-${color}-500 cursor-pointer ring-2 ring-offset-2 ring-offset-background ${
                        color === 'purple' ? 'ring-white' : 'ring-transparent'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
                  { key: 'sms', label: 'SMS Notifications', description: 'Text message alerts' },
                  { key: 'marketing', label: 'Marketing Emails', description: 'Product updates and tips' }
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between">
                    <div>
                      <Label>{notif.label}</Label>
                      <p className="text-sm text-muted-foreground">{notif.description}</p>
                    </div>
                    <Switch
                      checked={notifications[notif.key]}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [notif.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Change Password</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input type="password" placeholder="Current password" className="glass border-white/20" />
                    <Input type="password" placeholder="New password" className="glass border-white/20" />
                  </div>
                </div>
                <Button className="btn-primary">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'WhatsApp Business', status: 'Connected', color: 'text-green-400' },
                { name: 'Instagram', status: 'Connected', color: 'text-green-400' },
                { name: 'Facebook Pages', status: 'Connected', color: 'text-green-400' },
                { name: 'Telegram Bot', status: 'Disconnected', color: 'text-red-400' },
                { name: 'LinkedIn', status: 'Disconnected', color: 'text-red-400' },
                { name: 'Twitter/X', status: 'Pending', color: 'text-yellow-400' }
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-glass rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className={`text-sm ${integration.color}`}>{integration.status}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
