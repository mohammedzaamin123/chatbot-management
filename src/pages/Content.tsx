
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
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const Content: React.FC = () => {
  const [selectedType, setSelectedType] = useState('poster');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const contentTypes = [
    { id: 'poster', label: 'Social Media Poster', icon: Image, color: 'from-pink-500 to-purple-500' },
    { id: 'video', label: 'Video Content', icon: Video, color: 'from-blue-500 to-cyan-500' },
    { id: 'blog', label: 'Blog Article', icon: FileText, color: 'from-green-500 to-emerald-500' },
    { id: 'caption', label: 'Social Caption', icon: Sparkles, color: 'from-yellow-500 to-orange-500' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent({
        type: selectedType,
        title: 'Generated Content',
        preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
        content: selectedType === 'blog' ? 'This is a generated blog article about AI and technology...' : 'Generated social media content'
      });
      setIsGenerating(false);
    }, 3000);
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
                      className="data-[state=active]:bg-neon-gradient"
                    >
                      <type.icon className="w-4 h-4 mr-2" />
                      {type.label.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {contentTypes.map((type) => (
                  <TabsContent key={type.id} value={type.id} className="space-y-6 mt-6">
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

                      {type.id === 'poster' && (
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
                      )}

                      {type.id === 'video' && (
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
                      )}

                      <Button 
                        onClick={handleGenerate} 
                        disabled={isGenerating}
                        className="w-full btn-primary"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate {type.label}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </TabsContent>
                ))}
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
                    <span>Generated Content</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="btn-primary">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
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
                  {generatedContent.type === 'blog' && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">{generatedContent.title}</h3>
                      <p className="text-sm text-muted-foreground">{generatedContent.content}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
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
                <span className="text-sm">Total Downloads</span>
                <span className="font-bold">1,234</span>
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
