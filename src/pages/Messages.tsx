
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Filter, Star, Tag, User, Send, Phone, Video, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ThemeToggle } from '../components/ThemeToggle';
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
          <h1 className="text-4xl font-bold neon-text mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            Unified Inbox 📨
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage messages from all platforms in one beautiful place
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Button variant="outline" className="glass border-white/20 hover:scale-105 transition-all duration-300">
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
          <Card className="glass-strong border-white/10 rounded-3xl card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
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
                    className={`glass border-white/20 justify-between rounded-2xl hover:scale-105 transition-all duration-300 ${
                      filter === filterOption.id ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-dreamy' : ''
                    }`}
                    onClick={() => setFilter(filterOption.id)}
                  >
                    <span className="font-medium">{filterOption.label}</span>
                    <Badge variant="secondary" className="ml-2 rounded-full">
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
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'unread') markAsRead(message.id);
                }}
              >
                <Card className={`glass-strong border-white/10 hover:bg-white/5 rounded-3xl card-hover ${
                  message.status === 'unread' ? 'border-purple-400 shadow-pastel' : ''
                }`}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl floating">
                        {PLATFORM_ICONS[message.platform]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-sm truncate">
                            {message.from}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3 truncate">
                          {message.content}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`text-xs capitalize font-medium px-2 py-1 rounded-full ${PLATFORM_COLORS[message.platform]}`}>
                            {message.platform}
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            message.status === 'unread' ? 'bg-purple-400 shadow-glow animate-pulse' : 
                            message.status === 'read' ? 'bg-yellow-400' : 'bg-green-400'
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
              <Card className="glass-strong border-white/10 rounded-3xl card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl floating">
                        {PLATFORM_ICONS[selectedMessage.platform]}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{selectedMessage.from}</CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedMessage.platform} • {new Date(selectedMessage.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="glass border-white/20 hover:scale-105 transition-all duration-300 rounded-2xl">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-white/20 hover:scale-105 transition-all duration-300 rounded-2xl">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-white/20 hover:scale-105 transition-all duration-300 rounded-2xl">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Message Content */}
              <Card className="glass-strong border-white/10 rounded-3xl card-hover">
                <CardContent className="p-8">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">{selectedMessage.content}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Replies */}
              <Card className="glass-strong border-white/10 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Quick Replies
                  </CardTitle>
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
                        className="glass border-white/20 text-left justify-start rounded-2xl hover:scale-105 transition-all duration-300"
                        onClick={() => setReplyText(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reply Box */}
              <Card className="glass-strong border-white/10 rounded-3xl card-hover">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="glass border-white/20 rounded-2xl h-12"
                      onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="glass border-white/20 rounded-2xl hover:scale-105 transition-all duration-300">
                          <Tag className="w-4 h-4 mr-1" />
                          Tag
                        </Button>
                        <Button size="sm" variant="outline" className="glass border-white/20 rounded-2xl hover:scale-105 transition-all duration-300">
                          <User className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                      </div>
                      <Button onClick={handleReply} className="btn-primary rounded-2xl">
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="glass-strong border-white/10 h-96 flex items-center justify-center rounded-3xl card-hover">
              <div className="text-center">
                <MessageSquare className="w-20 h-20 text-muted-foreground mx-auto mb-4 floating" />
                <h3 className="font-semibold mb-2 text-xl">Select a message</h3>
                <p className="text-muted-foreground">Choose a message from the list to view and reply</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Enhanced Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Messages',
            value: messages.length,
            change: '+12%',
            color: 'from-purple-400 to-pink-400',
            icon: MessageSquare
          },
          {
            title: 'Unread',
            value: messages.filter(m => m.status === 'unread').length,
            change: '-8%',
            color: 'from-yellow-400 to-orange-400',
            icon: Filter
          },
          {
            title: 'Response Rate',
            value: '94%',
            change: '+3%',
            color: 'from-green-400 to-emerald-400',
            icon: Star
          },
          {
            title: 'Avg Response Time',
            value: '2.4m',
            change: '-15%',
            color: 'from-blue-400 to-cyan-400',
            icon: Send
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center floating`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.title}</div>
                <div className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-orange-400'}`}>
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
