
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
  Check
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
    permissions: [] as string[]
  });

  const handleCreateBot = () => {
    addChatbot({
      name: formData.name,
      status: 'inactive',
      platform: 'WhatsApp',
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
    setFormData({
      name: '',
      model: 'gpt-4o',
      system_prompt: '',
      greeting: '',
      database_connection: '',
      selected_collection: '',
      permissions: []
    });
  };

  const handleUpdateBot = () => {
    if (selectedBot) {
      updateChatbot(selectedBot.id, {
        name: formData.name,
        model: formData.model as any,
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
    }
    setIsSettingsOpen(false);
    setSelectedBot(null);
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
      permissions: bot.database_config?.permissions || []
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
          onClick={() => isEdit ? setIsSettingsOpen(false) : setIsCreateOpen(false)}
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
          <h1 className="text-4xl font-bold neon-text mb-2">
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
          <DialogContent className="glass-strong border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="neon-text">Create New Chatbot</DialogTitle>
            </DialogHeader>
            {renderFormContent(false)}
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="glass-strong border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="neon-text">Edit Chatbot Settings</DialogTitle>
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
                      <Database className="w-4 h-4 text-neon-purple" />
                      <span className="text-xs text-neon-purple">DB Connected</span>
                    </div>
                  )}
                </div>
                
                {/* Chatbot Overview */}
                <div className="space-y-2 bg-white/5 p-3 rounded-lg">
                  <h4 className="text-sm font-medium">Overview:</h4>
                  <div className="text-xs space-y-1">
                    <div><strong>Model:</strong> {bot.model.toUpperCase()}</div>
                    <div><strong>Platform:</strong> {bot.platform}</div>
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
                                <span key={perm} className="inline-flex items-center gap-1 px-1 py-0.5 bg-neon-purple/20 text-neon-purple rounded text-xs">
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
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Greeting:</strong> {bot.greeting}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(bot.created_at).toLocaleDateString()}
                  </div>
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
            className="metric-card h-full border-dashed border-2 border-white/20 cursor-pointer hover:border-neon-purple"
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

      {/* Stats Overview */}
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
    </div>
  );
};

export default Chatbots;
