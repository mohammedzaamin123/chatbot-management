import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Plus, 
  Settings, 
  Play, 
  Pause, 
  Trash2, 
  MessageSquare,
  Database,
  Brain,
  Zap,
  Check,
  Smartphone,
  Globe,
  Link,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { useStore } from '../store/useStore';

export const Chatbots: React.FC = () => {
  const { chatbots, addChatbot, updateChatbot, deleteChatbot, databases } = useStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    model: 'gpt-4o',
    system_prompt: '',
    greeting: '',
    database_connection: '',
    selected_collection: '',
    permissions: [] as string[],
    platforms: [] as any[]
  });

  const platformOptions = [
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, fields: ['webhook', 'phone_number'] },
    { value: 'telegram', label: 'Telegram', icon: MessageSquare, fields: ['webhook', 'bot_token'] },
    { value: 'instagram', label: 'Instagram', icon: MessageSquare, fields: ['webhook', 'api_token'] },
    { value: 'facebook', label: 'Facebook', icon: MessageSquare, fields: ['webhook', 'api_token'] },
    { value: 'discord', label: 'Discord', icon: MessageSquare, fields: ['webhook', 'bot_token'] },
    { value: 'slack', label: 'Slack', icon: MessageSquare, fields: ['webhook', 'bot_token'] },
    { value: 'website', label: 'Website Widget', icon: Globe, fields: ['webhook'] }
  ];

  const handleCreateBot = () => {
    addChatbot({
      name: formData.name,
      status: 'inactive',
      platforms: formData.platforms,
      model: formData.model as any,
      conversations: 0,
      system_prompt: formData.system_prompt,
      greeting: formData.greeting,
      database_config: formData.database_connection
        ? {
            connection_id: formData.database_connection,
            permissions: formData.permissions as any,
            collection: formData.selected_collection || undefined
          }
        : undefined
    });

    setIsCreateOpen(false);
    resetForm();
  };

  const handleUpdateBot = () => {
    if (selectedBot) {
      updateChatbot(selectedBot.id, {
        name: formData.name,
        model: formData.model as any,
        system_prompt: formData.system_prompt,
        greeting: formData.greeting,
        platforms: formData.platforms,
        database_config: formData.database_connection
          ? {
              connection_id: formData.database_connection,
              permissions: formData.permissions as any,
              collection: formData.selected_collection || undefined
            }
          : undefined
      });
    }
    setIsSettingsOpen(false);
    setSelectedBot(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      model: 'gpt-4o',
      system_prompt: '',
      greeting: '',
      database_connection: '',
      selected_collection: '',
      permissions: [],
      platforms: []
    });
  };

  const openSettings = (bot: any) => {
    setSelectedBot(bot);
    setFormData({
      name: bot.name,
      model: bot.model,
      system_prompt: bot.system_prompt,
      greeting: bot.greeting,
      database_connection: bot.database_config?.connection_id || '',
      selected_collection: bot.database_config?.collection || '',
      permissions: bot.database_config?.permissions || [],
      platforms: bot.platforms || []
    });
    setIsSettingsOpen(true);
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const addPlatform = () => {
    setFormData(prev => ({
      ...prev,
      platforms: [
        ...prev.platforms,
        {
          platform: 'whatsapp',
          webhook: { url: '', enabled: true },
          phone_number: '',
          bot_token: '',
          api_token: ''
        }
      ]
    }));
  };

  const removePlatform = (index: number) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.filter((_, i) => i !== index)
    }));
  };

  const updatePlatform = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.map((platform, i) => 
        i === index ? { ...platform, [field]: value } : platform
      )
    }));
  };

  const updatePlatformWebhook = (index: number, webhookField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.map((platform, i) => 
        i === index 
          ? { 
              ...platform, 
              webhook: { 
                ...platform.webhook, 
                [webhookField]: value 
              } 
            } 
          : platform
      )
    }));
  };

  const toggleBotStatus = (botId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateChatbot(botId, { status: newStatus });
  };

  const renderFormContent = (isEdit: boolean = false) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Chatbot Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Customer Support AI"
            className="glass border-white/20"
          />
        </div>
        <div>
          <Label htmlFor="model">AI Model</Label>
          <Select
            value={formData.model}
            onValueChange={(value) => setFormData(prev => ({ ...prev, model: value }))}
          >
            <SelectTrigger className="glass border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-white/20 bg-black/90 z-50">
              <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
              <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
              <SelectItem value="gemini">Gemini Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="greeting">Greeting Message</Label>
        <Input
          id="greeting"
          value={formData.greeting}
          onChange={(e) => setFormData(prev => ({ ...prev, greeting: e.target.value }))}
          placeholder="Hi! How can I help you today?"
          className="glass border-white/20"
        />
      </div>
      
      <div>
        <Label htmlFor="system_prompt">System Prompt</Label>
        <Textarea
          id="system_prompt"
          value={formData.system_prompt}
          onChange={(e) => setFormData(prev => ({ ...prev, system_prompt: e.target.value }))}
          placeholder="You are a helpful customer support assistant..."
          className="glass border-white/20 h-24"
        />
      </div>

      {/* Platform Configuration */}
      <div className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Deployment Platforms
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPlatform}
            className="glass border-white/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Platform
          </Button>
        </div>

        <div className="space-y-4">
          {formData.platforms.map((platform, index) => (
            <Card key={index} className="glass border-white/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span className="font-medium">Platform {index + 1}</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePlatform(index)}
                    className="glass border-white/20 hover:border-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Platform Type</Label>
                    <Select
                      value={platform.platform}
                      onValueChange={(value) => updatePlatform(index, 'platform', value)}
                    >
                      <SelectTrigger className="glass border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass border-white/20 bg-black/90 z-50">
                        {platformOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

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
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updatePlatformWebhook(index, 'enabled', !platform.webhook?.enabled)}
                        className={`glass border-white/20 ${platform.webhook?.enabled ? 'bg-green-500/20' : ''}`}
                      >
                        <Link className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Platform-specific fields */}
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
          ))}
        </div>

        {formData.platforms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No platforms configured yet. Add a platform to deploy your chatbot.</p>
          </div>
        )}
      </div>
      
      {/* Database Integration - keep existing code */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Database className="w-4 h-4" />
          Database Integration
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="database">Connect Database</Label>
            <Select
              value={formData.database_connection}
              onValueChange={(value) => {
                setFormData(prev => ({
                  ...prev,
                  database_connection: value,
                  selected_collection: ''
                }));
              }}
            >
              <SelectTrigger className="glass border-white/20">
                <SelectValue placeholder="Select database" />
              </SelectTrigger>
              <SelectContent className="glass border-white/20 bg-black/90 z-50">
                {databases.map((db) => (
                  <SelectItem key={db.id} value={db.id}>{db.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Collection</Label>
            <Select
              value={formData.selected_collection}
              onValueChange={(collection) => setFormData(prev => ({
                ...prev,
                selected_collection: collection
              }))}
              disabled={
                !formData.database_connection ||
                !databases.find(db => db.id === formData.database_connection)
              }
            >
              <SelectTrigger className="glass border-white/20">
                <SelectValue placeholder="Choose collection" />
              </SelectTrigger>
              <SelectContent className="glass border-white/20 bg-black/90 z-50">
                {(databases.find(db => db.id === formData.database_connection)?.collections || []).map((coll) => (
                  <SelectItem key={coll} value={coll}>{coll}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4">
          <Label className="text-sm font-medium mb-3 block">Database Permissions</Label>
          <div className="grid grid-cols-2 gap-3">
            {['READ', 'WRITE', 'UPDATE', 'DELETE'].map((perm) => (
              <div key={perm} className="flex items-center space-x-2">
                <Checkbox
                  id={perm}
                  checked={formData.permissions.includes(perm)}
                  onCheckedChange={() => togglePermission(perm)}
                />
                <Label htmlFor={perm} className="text-sm cursor-pointer">
                  {perm}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={() => {
            if (isEdit) {
              setIsSettingsOpen(false);
            } else {
              setIsCreateOpen(false);
            }
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={isEdit ? handleUpdateBot : handleCreateBot} 
          className="btn-primary"
        >
          {isEdit ? 'Update Chatbot' : 'Create Chatbot'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            AI Chatbots 🤖
          </h1>
          <p className="text-lg text-muted-foreground">
            Build and manage intelligent chatbots for your business
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Chatbot
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-primary">Create New Chatbot</DialogTitle>
            </DialogHeader>
            {renderFormContent(false)}
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats Overview - Moved above chatbots grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-strong border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{chatbots.length}</div>
                <div className="text-sm text-muted-foreground">Total Chatbots</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-strong border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {chatbots.filter(bot => bot.status === 'active').length}
                </div>
                <div className="text-sm text-muted-foreground">Active Bots</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-strong border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {chatbots.reduce((sum, bot) => sum + bot.conversations, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Conversations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="glass-strong border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">Edit Chatbot Settings</DialogTitle>
          </DialogHeader>
          {renderFormContent(true)}
        </DialogContent>
      </Dialog>

      {/* Chatbots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatbots.map((bot, index) => (
          <motion.div
            key={bot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      bot.status === 'active' ? 'from-green-500 to-emerald-500' :
                      bot.status === 'training' ? 'from-yellow-500 to-orange-500' :
                      'from-gray-500 to-gray-600'
                    } flex items-center justify-center`}>
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{bot.model.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    bot.status === 'active' ? 'status-active' : 
                    bot.status === 'inactive' ? 'status-inactive' : 'status-pending'
                  }`}>
                    {bot.status}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{bot.conversations} conversations</span>
                  </div>
                  {bot.database_config && (
                    <div className="flex items-center gap-1">
                      <Database className="w-4 h-4 text-primary" />
                      <span className="text-xs text-primary">DB Connected</span>
                    </div>
                  )}
                </div>
                
                {/* Platform Display */}
                <div className="space-y-2 bg-white/5 p-3 rounded-lg">
                  <h4 className="text-sm font-medium">Deployed Platforms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bot.platforms && bot.platforms.length > 0 ? (
                      bot.platforms.map((platform, idx) => (
                        <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                          <Smartphone className="w-3 h-3" />
                          {platformOptions.find(p => p.value === platform.platform)?.label || platform.platform}
                          {platform.webhook?.enabled && (
                            <Link className="w-3 h-3 ml-1" />
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">No platforms configured</span>
                    )}
                  </div>
                </div>

                {/* Bot Overview */}
                <div className="space-y-2 bg-white/5 p-3 rounded-lg">
                  <h4 className="text-sm font-medium">Overview:</h4>
                  <div className="text-xs space-y-1">
                    <div><strong>Model:</strong> {bot.model.toUpperCase()}</div>
                    <div><strong>Greeting:</strong> {bot.greeting}</div>
                    {bot.database_config && (
                      <>
                        <div><strong>Database:</strong> {databases.find(db => db.id === bot.database_config?.connection_id)?.name || 'Connected'}</div>
                        {bot.database_config.collection && (
                          <div><strong>Collection:</strong> {bot.database_config.collection}</div>
                        )}
                        {bot.database_config.permissions && bot.database_config.permissions.length > 0 && (
                          <div className="flex items-center gap-1">
                            <strong>Permissions:</strong>
                            <div className="flex gap-1">
                              {bot.database_config.permissions.map((perm) => (
                                <span key={perm} className="inline-flex items-center gap-1 px-1 py-0.5 bg-primary/20 text-primary rounded text-xs">
                                  <Check className="w-3 h-3" />
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Created {new Date(bot.created_at).toLocaleDateString()}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 glass border-white/20"
                    onClick={() => toggleBotStatus(bot.id, bot.status)}
                  >
                    {bot.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20"
                    onClick={() => openSettings(bot)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20 hover:border-red-500"
                    onClick={() => deleteChatbot(bot.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {/* Create New Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: chatbots.length * 0.1 }}
        >
          <Card 
            className="metric-card h-full border-dashed border-2 border-white/20 cursor-pointer hover:border-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-16 h-16 rounded-xl glass flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Create New Chatbot</h3>
              <p className="text-sm text-muted-foreground text-center">
                Build an AI assistant tailored to your business needs
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Chatbots;
