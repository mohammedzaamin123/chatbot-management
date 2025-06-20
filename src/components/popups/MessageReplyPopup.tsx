
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { MessageSquare, Send, Bot, User } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface MessageReplyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
}

export const MessageReplyPopup: React.FC<MessageReplyPopupProps> = ({
  isOpen,
  onClose,
  messageId
}) => {
  const { messages, updateMessage } = useStore();
  const message = messages.find(m => m.id === messageId);
  const [reply, setReply] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [isSending, setIsSending] =  useState(false);

  if (!message) return null;

  const handleSend = async () => {
    if (!reply.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      updateMessage(messageId, { status: 'replied' });
      setIsSending(false);
      onClose();
    }, 1000);
  };

  const generateAIReply = () => {
    const aiReplies = [
      "Thank you for reaching out! I'd be happy to help you with this. Let me get back to you with more details shortly.",
      "I understand your concern. Let me look into this matter and provide you with a comprehensive solution.",
      "Thanks for your message! I'll review your request and get back to you with the information you need.",
      "I appreciate your patience. Let me connect you with the right person who can best assist you with this."
    ];
    
    const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
    setReply(randomReply);
    setUseAI(true);
  };

  const platformIcons = {
    whatsapp: '📱',
    instagram: '📷',
    telegram: '💬',
    facebook: '👥'
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Reply to Message"
      size="lg"
    >
      <div className="space-y-4">
        {/* Original Message */}
        <div className="p-4 rounded-lg bg-muted/50 border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{platformIcons[message.platform]}</span>
              <span className="font-medium">{message.from}</span>
              <Badge variant="outline" className="capitalize">
                {message.platform}
              </Badge>
            </div>
            <Badge variant={message.status === 'unread' ? 'destructive' : 'secondary'}>
              {message.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(message.timestamp).toLocaleString()}
          </p>
          <p className="font-inter">{message.content}</p>
        </div>

        {/* Reply Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Your Reply</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateAIReply}
              className="text-xs"
            >
              <Bot className="w-3 h-3 mr-1" />
              AI Assist
            </Button>
          </div>
          
          <Textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply here..."
            rows={4}
            className="resize-none"
          />
          
          {useAI && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="w-3 h-3" />
              <span>AI-suggested reply (you can edit before sending)</span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!reply.trim() || isSending}
            className="btn-primary"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </>
            )}
          </Button>
        </div>
      </div>
    </Popup>
  );
};
