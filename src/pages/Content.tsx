
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  MessageSquare,
  CheckCircle,
  XCircle,
  Calendar,
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Settings,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState('business-ai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessInfo, setBusinessInfo] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [pendingPosts, setPendingPosts] = useState([
    {
      id: 1,
      type: 'business-ai',
      title: 'AI-Generated: Tech Industry Insights',
      content: 'Based on your business profile, here\'s what\'s trending in tech...',
      platform: 'LinkedIn',
      scheduledFor: '2024-01-15 10:00 AM',
      status: 'pending'
    },
    {
      id: 2,
      type: 'custom-prompt',
      title: 'Custom: Product Launch Announcement',
      content: 'Exciting news! We\'re launching our new AI-powered solution...',
      platform: 'Twitter',
      scheduledFor: '2024-01-15 2:00 PM',
      status: 'pending'
    }
  ]);

  const handleBusinessAIGenerate = async () => {
    if (!businessInfo.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        type: 'business-ai',
        title: 'AI-Generated Business Content',
        content: `AI learned from: "${businessInfo.substring(0, 50)}..." and created relevant content.`,
        platform: 'LinkedIn',
        scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(),
        status: 'pending'
      };
      setPendingPosts(prev => [newPost, ...prev]);
      setIsGenerating(false);
      setBusinessInfo('');
    }, 3000);
  };

  const handleCustomPromptGenerate = async () => {
    if (!customPrompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        type: 'custom-prompt',
        title: 'Custom Prompt Generated Content',
        content: `Generated from: "${customPrompt.substring(0, 50)}..."`,
        platform: 'Twitter',
        scheduledFor: new Date(Date.now() + 12 * 60 * 60 * 1000).toLocaleString(),
        status: 'pending'
      };
      setPendingPosts(prev => [newPost, ...prev]);
      setIsGenerating(false);
      setCustomPrompt('');
    }, 2000);
  };

  const handleApprovePost = (postId: number) => {
    setPendingPosts(prev => prev.filter(post => post.id !== postId));
  };

  const handleRejectPost = (postId: number) => {
    setPendingPosts(prev => prev.filter(post => post.id !== postId));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Content Manager
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let AI learn your business and create personalized content, or use custom prompts for specific needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Creation Area */}
        <div className="lg:col-span-2">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Create Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="business-ai" 
                    className="flex items-center gap-2 data-[state=active]:bg-purple-500/20"
                  >
                    <Brain className="w-4 h-4" />
                    Business AI Learning
                  </TabsTrigger>
                  <TabsTrigger 
                    value="custom-prompt"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Custom Prompts
                  </TabsTrigger>
                </TabsList>

                {/* Business AI Learning Tab */}
                <TabsContent value="business-ai" className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-6 rounded-lg border border-purple-500/20">
                    <div className="flex items-start gap-4">
                      <Bot className="w-8 h-8 text-purple-400 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">
                          Step 1: Teach AI About Your Business
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Share details about your business, industry, target audience, and brand voice. 
                          AI will learn and create content that matches your brand perfectly.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Industry</span>
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Target Audience</span>
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Brand Voice</span>
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Products/Services</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Business Information</Label>
                      <Textarea
                        placeholder="Tell AI about your business: What industry are you in? Who is your target audience? What's your brand voice? What products/services do you offer? What topics should we focus on?"
                        className="mt-2 h-32 bg-black/20 border-white/20"
                        value={businessInfo}
                        onChange={(e) => setBusinessInfo(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Content Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Primary Platform</Label>
                        <Select defaultValue="linkedin">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={handleBusinessAIGenerate}
                      disabled={isGenerating || !businessInfo.trim()}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                          AI is Learning Your Business...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          Start AI Business Learning
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Custom Prompt Tab */}
                <TabsContent value="custom-prompt" className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-lg border border-blue-500/20">
                    <div className="flex items-start gap-4">
                      <MessageSquare className="w-8 h-8 text-blue-400 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">
                          Step 1: Create Custom Content
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Write specific prompts to generate exactly the content you need. 
                          Perfect for one-off posts, campaigns, or unique content requirements.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Specific Topics</span>
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Custom Tone</span>
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Targeted Content</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Custom Prompt</Label>
                      <Textarea
                        placeholder="Write a detailed prompt: What type of content do you want? What tone should it have? What key points should be included? Who is the target audience?"
                        className="mt-2 h-24 bg-black/20 border-white/20"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Content Type</Label>
                        <Select defaultValue="social">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="social">Social Post</SelectItem>
                            <SelectItem value="blog">Blog Article</SelectItem>
                            <SelectItem value="email">Email Content</SelectItem>
                            <SelectItem value="ad">Advertisement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Tone</Label>
                        <Select defaultValue="professional">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="authoritative">Authoritative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Length</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="short">Short</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="long">Long</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={handleCustomPromptGenerate}
                      disabled={isGenerating || !customPrompt.trim()}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                          Generating Custom Content...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Generate Custom Content
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Approval Queue */}
        <div className="space-y-6">
          {/* Pending Approval Section */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  Step 2: Review & Approve
                </span>
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                  {pendingPosts.length} pending
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingPosts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No posts waiting for approval</p>
                  <p className="text-sm">Generate content to see it here</p>
                </div>
              ) : (
                pendingPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-black/20 rounded-lg border border-white/10 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.type === 'business-ai' 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {post.type === 'business-ai' ? 'AI Generated' : 'Custom Prompt'}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.platform}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{post.content}</p>
                      <p className="text-xs text-muted-foreground">📅 {post.scheduledFor}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprovePost(post.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve & Post
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectPost(post.id)}
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">This Month</span>
                <span className="font-bold">47 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Review</span>
                <span className="font-bold text-yellow-400">{pendingPosts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Auto-Posted</span>
                <span className="font-bold text-green-400">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Engagement Rate</span>
                <span className="font-bold text-blue-400">8.5%</span>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Content Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Brand Guidelines
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Auto-Post Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Content;
