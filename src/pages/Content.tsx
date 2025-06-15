import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Image, 
  Video, 
  FileText, 
  Download, 
  Share2,
  Palette,
  Wand2,
  Upload,
  Calendar,
  Brain,
  MessageSquare,
  CheckCircle,
  XCircle,
  Send,
  Bot
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const Content: React.FC = () => {
  const [selectedType, setSelectedType] = useState('business-ai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
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

  const contentTypes = [
    { id: 'business-ai', label: 'Business AI Learning', icon: Brain, color: 'from-purple-500 to-indigo-500' },
    { id: 'custom-prompt', label: 'Custom Prompt Creation', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { id: 'poster', label: 'Social Media Poster', icon: Image, color: 'from-pink-500 to-purple-500' },
    { id: 'video', label: 'Video Content', icon: Video, color: 'from-green-500 to-emerald-500' }
  ];

  const handleBusinessAIGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI learning and generating content
    setTimeout(() => {
      setGeneratedContent({
        type: 'business-ai',
        title: 'AI-Generated Business Content',
        content: `Based on your business information: "${businessInfo.substring(0, 50)}...", I've created content that aligns with your brand voice and industry trends.`,
        preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'
      });
      setIsGenerating(false);
    }, 3000);
  };

  const handleCustomPromptGenerate = async () => {
    setIsGenerating(true);
    // Simulate custom prompt processing
    setTimeout(() => {
      setGeneratedContent({
        type: 'custom-prompt',
        title: 'Custom Prompt Generated Content',
        content: `Content generated from your custom prompt: "${customPrompt.substring(0, 50)}..."`,
        preview: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop'
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleApprovePost = (postId: number) => {
    setPendingPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, status: 'approved' } : post
    ));
  };

  const handleRejectPost = (postId: number) => {
    setPendingPosts(prev => prev.filter(post => post.id !== postId));
  };

  const recentContent = [
    {
      id: 1,
      type: 'poster',
      title: 'AI Technology Post',
      preview: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop',
      created: '2 hours ago'
    },
    {
      id: 2,
      type: 'video',
      title: 'Product Demo Reel',
      preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      created: '1 day ago'
    },
    {
      id: 3,
      type: 'blog',
      title: 'Future of AI in Business',
      preview: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop',
      created: '2 days ago'
    }
  ];

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
            AI Content Creator ✨
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate stunning content with the power of AI
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="glass border-white/20">
            <Palette className="w-4 h-4 mr-2" />
            Brand Kit
          </Button>
          <Button className="btn-primary">
            <Upload className="w-4 h-4 mr-2" />
            Upload Assets
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Creator */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Create New Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedType} onValueChange={setSelectedType}>
                <TabsList className="grid w-full grid-cols-4 glass">
                  {contentTypes.map((type) => (
                    <TabsTrigger 
                      key={type.id} 
                      value={type.id}
                      className="data-[state=active]:bg-neon-gradient flex flex-col items-center gap-1 p-3"
                    >
                      <type.icon className="w-4 h-4" />
                      <span className="text-xs">{type.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Business AI Learning Tab */}
                <TabsContent value="business-ai" className="space-y-6 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-5 h-5 text-purple-400" />
                        <h3 className="font-semibold text-purple-400">Business AI Learning</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tell our AI about your business, and it will learn to create content that matches your brand voice and industry.
                      </p>
                    </div>

                    <div>
                      <Label>Tell AI About Your Business</Label>
                      <Textarea
                        placeholder="Describe your business, industry, target audience, brand voice, products/services, company values, and any specific topics you want to focus on..."
                        className="glass border-white/20 h-32"
                        value={businessInfo}
                        onChange={(e) => setBusinessInfo(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Content Frequency</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Daily" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Primary Platform</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="LinkedIn" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
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
                      className="w-full btn-primary"
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
                  </motion.div>
                </TabsContent>

                {/* Custom Prompt Tab */}
                <TabsContent value="custom-prompt" className="space-y-6 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                        <h3 className="font-semibold text-blue-400">Custom Prompt Creation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Create specific content using custom prompts tailored to your exact needs.
                      </p>
                    </div>

                    <div>
                      <Label>Custom Prompt</Label>
                      <Textarea
                        placeholder="Write a detailed prompt for the content you want to create. Be specific about tone, style, key points, and target audience..."
                        className="glass border-white/20 h-24"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Content Type</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Social Post" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="social">Social Post</SelectItem>
                            <SelectItem value="blog">Blog Article</SelectItem>
                            <SelectItem value="email">Email Content</SelectItem>
                            <SelectItem value="ad">Advertisement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Tone</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Professional" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="authoritative">Authoritative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Length</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Medium" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
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
                      className="w-full btn-primary"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                          Generating Custom Content...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Generate Custom Content
                        </>
                      )}
                    </Button>
                  </motion.div>
                </TabsContent>

                <TabsContent value="poster" className="space-y-6 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Content Topic</Label>
                        <Input
                          placeholder="AI technology trends"
                          className="glass border-white/20"
                        />
                      </div>
                      <div>
                        <Label>Style/Tone</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="minimalist">Minimalist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Content Description</Label>
                      <Textarea
                        placeholder="Describe what you want to create..."
                        className="glass border-white/20 h-24"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Dimensions</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="1080x1080" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="square">1080x1080 (Square)</SelectItem>
                            <SelectItem value="story">1080x1920 (Story)</SelectItem>
                            <SelectItem value="landscape">1200x630 (Landscape)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Color Scheme</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Neon" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="neon">Neon</SelectItem>
                            <SelectItem value="pastel">Pastel</SelectItem>
                            <SelectItem value="monochrome">Monochrome</SelectItem>
                            <SelectItem value="brand">Brand Colors</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Add Logo</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Yes" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {}} 
                      disabled={isGenerating}
                      className="w-full btn-primary"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Poster
                    </Button>
                  </motion.div>
                </TabsContent>

                <TabsContent value="video" className="space-y-6 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Content Topic</Label>
                        <Input
                          placeholder="AI technology trends"
                          className="glass border-white/20"
                        />
                      </div>
                      <div>
                        <Label>Style/Tone</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="minimalist">Minimalist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Content Description</Label>
                      <Textarea
                        placeholder="Describe what you want to create..."
                        className="glass border-white/20 h-24"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Duration</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="15 seconds" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">1 minute</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Video Style</Label>
                        <Select>
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue placeholder="Motion Graphics" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/20">
                            <SelectItem value="motion">Motion Graphics</SelectItem>
                            <SelectItem value="slideshow">Slideshow</SelectItem>
                            <SelectItem value="animated">Animated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {}} 
                      disabled={isGenerating}
                      className="w-full btn-primary"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Video
                    </Button>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Generated Content Preview */}
          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="glass-strong border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Generated Content - Pending Approval</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve & Schedule
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={generatedContent.preview} 
                      alt="Generated content"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{generatedContent.title}</h3>
                    <p className="text-sm text-muted-foreground">{generatedContent.content}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Pending Posts for Approval */}
          {pendingPosts.length > 0 && (
            <Card className="glass-strong border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Posts Pending Approval
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 glass rounded-lg border border-white/10"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.type === 'business-ai' 
                            ? 'bg-purple-500/20 text-purple-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {post.type === 'business-ai' ? 'AI Generated' : 'Custom Prompt'}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.platform}</span>
                      </div>
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{post.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">📅 {post.scheduledFor}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleApprovePost(post.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4" />
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
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Content */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Recent Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 glass rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                    <img 
                      src={item.preview} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.created}</div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Content Stats */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Content Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-bold">47 pieces</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Approval</span>
                <span className="font-bold text-yellow-400">{pendingPosts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-Posted</span>
                <span className="font-bold text-green-400">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Scheduled</span>
                <span className="font-bold">12 posts</span>
              </div>
            </CardContent>
          </Card>

          {/* Brand Kit */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Brand Kit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs">Brand Colors</Label>
                <div className="flex gap-2 mt-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-pink-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg"></div>
                </div>
              </div>
              <div>
                <Label className="text-xs">Fonts</Label>
                <div className="text-sm mt-2 space-y-1">
                  <div className="font-manrope">Manrope (Primary)</div>
                  <div className="font-inter">Inter (Secondary)</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full glass border-white/20">
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Content;
