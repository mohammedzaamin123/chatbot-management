
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Bot, Plus, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface ChatbotConfigPopupProps {
  isOpen: boolean;
  onClose: () => void;
  chatbotId?: string;
}

export const ChatbotConfigPopup: React.FC<ChatbotConfigPopupProps> = ({
  isOpen,
  onClose,
  chatbotId
}) => {
  const { addChatbot, updateChatbot, chatbots } = useStore();
  const existingBot = chatbotId ? chatbots.find(bot => bot.id === chatbotId) : null;
  
  const [formData, setFormData] = useState({
    name: existingBot?.name || '',
    model: existingBot?.model || 'gpt-4o',
    system_prompt: existingBot?.system_prompt || '',
    greeting: existingBot?.greeting || 'Hello! How can I help you today?',
    platforms: existingBot?.platforms || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (existingBot) {
      updateChatbot(existingBot.id, formData);
    } else {
      addChatbot({
        ...formData,
        status: 'active',
        conversations: 0,
        platforms: []
      });
    }
    
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={existingBot ? 'Edit Chatbot' : 'Create New Chatbot'}
      description="Configure your AI chatbot settings"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Chatbot Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter chatbot name"
            required
          />
        </div>

        <div>
          <Label htmlFor="model">AI Model</Label>
          <Select
            value={formData.model}
            onValueChange={(value: 'gpt-4o' | 'claude' | 'gemini') => 
              setFormData({ ...formData, model: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4o (OpenAI)</SelectItem>
              <SelectItem value="claude">Claude (Anthropic)</SelectItem>
              <SelectItem value="gemini">Gemini (Google)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="greeting">Greeting Message</Label>
          <Input
            id="greeting"
            value={formData.greeting}
            onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
            placeholder="Enter greeting message"
          />
        </div>

        <div>
          <Label htmlFor="system_prompt">System Prompt</Label>
          <Textarea
            id="system_prompt"
            value={formData.system_prompt}
            onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
            placeholder="Define the chatbot's personality and behavior"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="btn-primary">
            <Bot className="w-4 h-4 mr-2" />
            {existingBot ? 'Update Chatbot' : 'Create Chatbot'}
          </Button>
        </div>
      </form>
    </Popup>
  );
};
