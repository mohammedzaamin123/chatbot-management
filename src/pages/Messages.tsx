
import React, { useState } from 'react';
import { motion } from '

framer-motion';
import { MessageSquare, Filter, Star, Tag, User, Send, Phone, Video } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';

const PLATFORM_ICONS = {
  whatsapp: '💬',
  instagram: '📷',
  telegram: '✈️',
  facebook: '👥'
};

const PLATFORM_COLORS = {
  whatsapp: 'text-green-500',
  instagram: 'text-pink-500',
  telegram: 'text-blue-500',
  facebook: 'text-blue-600'
};

export const Messages: React.FC = () => {
  const { messages, updateMessage } = useStore();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    if (filter === 'unread') return msg.status === 'unread';
    if (filter === 'starred') return msg.assigned_to === 'starred';
    return msg.platform === filter;
  });

  const handleReply = () => {
    if (selectedMessage && replyText.trim()) {
      updateMessage(selectedMessage.id, { status: 'replied' });
      setReplyText('');
    }
  };

  const markAsRead = (messageId: string) => {
    updateMessage(messageId, { status: 'read' });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">
            Unified Inbox 📨
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage messages from all platforms in one place
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="glass border-white/20">
            <Tag className="w-4 h-4 mr-2" />
            Add Tags
          </Button>
          <Button className="btn-primary">
            <User className="w-4 h-4 mr-2" />
            Assign Team
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All', count: messages.length },
                  { id: 'unread', label: 'Unread', count: messages.filter(m => m.status === 'unread').length },
                  { id: 'whatsapp', label: 'WhatsApp', count: messages.filter(m => m.platform === 'whatsapp').length },
                  { id: 'instagram', label: 'Instagram', count: messages.filter(m => m.platform === 'instagram').length },
                  { id: 'telegram', label: 'Telegram', count: messages.filter(m => m.platform === 'telegram').length },
                  { id: 'facebook', label: 'Facebook', count: messages.filter(m => m.platform === 'facebook').length }
                ].map((filterOption) => (
                  <Button
                    key={filterOption.id}
                    size="sm"
                    variant="outline"
                    className={`glass border-white/20 justify-between ${
                      filter === filterOption.id ? 'bg-neon-purple' : ''
                    }`}
                    onClick={() => setFilter(filterOption.id)}
                  >
                    <span>{filterOption.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {filterOption.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`cursor-pointer transition-all ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-neon-purple' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'unread') markAsRead(message.id);
                }}
              >
                <Card className={`glass-strong border-white/10 hover:bg-white/5 ${
                  message.status === 'unread' ? 'border-neon-purple' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {PLATFORM_ICONS[message.platform]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-sm truncate">
                            {message.from}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2 truncate">
                          {message.content}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`text-xs capitalize ${PLATFORM_COLORS[message.platform]}`}>
                            {message.platform}
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            message.status === 'unread' ? 'bg-neon-purple' : 
                            message.status === 'read' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Message Detail & Reply */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Message Header */}
              <Card className="glass-strong border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {PLATFORM_ICONS[selectedMessage.platform]}
                      </div>
                      <div>
                        <CardTitle>{selectedMessage.from}</CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedMessage.platform} • {new Date(selectedMessage.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Message Content */}
              <Card className="glass-strong border-white/10">
                <CardContent className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">{selectedMessage.content}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Replies */}
              <Card className="glass-strong border-white/10">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Replies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Thank you for your message!',
                      'I\'ll get back to you shortly.',
                      'Can you provide more details?',
                      'Let me check that for you.'
                    ].map((reply, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        className="glass border-white/20 text-left justify-start"
                        onClick={() => setReplyText(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reply Box */}
              <Card className="glass-strong border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="glass border-white/20"
                      onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="glass border-white/20">
                          <Tag className="w-4 h-4 mr-1" />
                          Tag
                        </Button>
                        <Button size="sm" variant="outline" className="glass border-white/20">
                          <User className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                      </div>
                      <Button onClick={handleReply} className="btn-primary">
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="glass-strong border-white/10 h-96 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Select a message</h3>
                <p className="text-muted-foreground">Choose a message from the list to view and reply</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Messages',
            value: messages.length,
            change: '+12%',
            color: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Unread',
            value: messages.filter(m => m.status === 'unread').length,
            change: '-8%',
            color: 'from-yellow-500 to-orange-500'
          },
          {
            title: 'Response Rate',
            value: '94%',
            change: '+3%',
            color: 'from-green-500 to-emerald-500'
          },
          {
            title: 'Avg Response Time',
            value: '2.4m',
            change: '-15%',
            color: 'from-blue-500 to-cyan-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.title}</div>
                <div className="text-xs text-green-400">{stat.change}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
