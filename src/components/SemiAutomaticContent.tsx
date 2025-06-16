
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, 
  Image, 
  Video, 
  MessageSquare, 
  Plus, 
  Sparkles,
  RefreshCw,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Calendar,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useStore } from '../store/useStore';
import { useToast } from '../hooks/use-toast';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' }
];

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'image' | 'video' | 'carousel';
  platforms: string[];
  trending: boolean;
}

export const SemiAutomaticContent: React.FC = () => {
  const { addDraftPost } = useStore();
  const { toast } = useToast();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isIdeaGeneratorOpen, setIsIdeaGeneratorOpen] = useState(false);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [contentType, setContentType] = useState<'text' | 'image' | 'video' | 'all'>('all');
  const [ideaPrompt, setIdeaPrompt] = useState('');
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  
  const [formData, setFormData] = useState({
    content: '',
    platforms: [] as string[],
    contentType: 'text' as 'text' | 'image' | 'video',
    media: [] as string[]
  });

  const generateContentIdeas = async () => {
    setIsGeneratingIdeas(true);
    
    // Simulate AI idea generation
    setTimeout(() => {
      const ideas: ContentIdea[] = [
        {
          id: '1',
          title: 'Industry Insights Post',
          description: 'Share latest trends and insights in your industry with professional analysis',
          type: 'text',
          platforms: ['linkedin', 'twitter'],
          trending: true
        },
        {
          id: '2',
          title: 'Behind the Scenes Video',
          description: 'Show your team at work, company culture, or product creation process',
          type: 'video',
          platforms: ['instagram', 'facebook'],
          trending: false
        },
        {
          id: '3',
          title: 'Product Showcase Carousel',
          description: 'Highlight your products/services with multiple engaging images',
          type: 'carousel',
          platforms: ['instagram', 'facebook'],
          trending: true
        },
        {
          id: '4',
          title: 'Customer Success Story',
          description: 'Feature a satisfied customer with testimonial and results',
          type: 'image',
          platforms: ['instagram', 'linkedin'],
          trending: false
        },
        {
          id: '5',
          title: 'Quick Tips Thread',
          description: 'Share actionable tips related to your expertise in thread format',
          type: 'text',
          platforms: ['twitter', 'linkedin'],
          trending: true
        }
      ];
      
      setContentIdeas(ideas);
      setIsGeneratingIdeas(false);
      toast({
        title: "Content Ideas Generated!",
        description: "Here are some AI-powered content suggestions for you."
      });
    }, 2000);
  };

  const useContentIdea = (idea: ContentIdea) => {
    setFormData({
      content: `${idea.title}\n\n${idea.description}`,
      platforms: idea.platforms,
      contentType: idea.type === 'carousel' ? 'image' : idea.type,
      media: []
    });
    setIsIdeaGeneratorOpen(false);
    setIsCreateOpen(true);
  };

  const handleCreatePost = () => {
    if (!formData.content.trim()) {
      toast({
        title: "Content Required",
        description: "Please add some content for your post."
      });
      return;
    }

    if (formData.platforms.length === 0) {
      toast({
        title: "Select Platforms",
        description: "Please select at least one platform."
      });
      return;
    }

    addDraftPost({
      content: formData.content,
      platforms: formData.platforms as ('instagram' | 'facebook' | 'twitter' | 'linkedin')[],
      media: formData.media
    });

    toast({
      title: "Draft Created!",
      description: "Your post has been saved as a draft. You can schedule it from the scheduler."
    });

    setFormData({
      content: '',
      platforms: [],
      contentType: 'text',
      media: []
    });
    setIsCreateOpen(false);
  };

  const generateAIContent = async () => {
    if (!formData.content.trim()) {
      toast({
        title: "Add a Topic First",
        description: "Please add a topic or brief description to generate AI content."
      });
      return;
    }

    toast({
      title: "Generating Content...",
      description: "AI is creating engaging content based on your topic."
    });

    // Simulate AI content generation
    setTimeout(() => {
      const enhancedContent = `🚀 ${formData.content}

✨ Key insights:
• Professional approach to modern challenges
• Actionable strategies for growth
• Expert tips from industry leaders

💡 What are your thoughts on this? Share your experience in the comments!

#Innovation #Growth #Business #Success`;

      setFormData(prev => ({ ...prev, content: enhancedContent }));
      
      toast({
        title: "Content Enhanced!",
        description: "AI has improved your content with engaging elements."
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="h-20 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
        >
          <div className="text-center">
            <Plus className="w-6 h-6 mx-auto mb-2" />
            <span>Create New Post</span>
          </div>
        </Button>

        <Button
          onClick={() => setIsIdeaGeneratorOpen(true)}
          variant="outline"
          className="h-20 border-white/20 glass"
        >
          <div className="text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-2" />
            <span>AI Content Ideas</span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-20 border-white/20 glass"
        >
          <div className="text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2" />
            <span>Schedule Posts</span>
          </div>
        </Button>
      </div>

      {/* Content Creation Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-blue-400" />
              AI Content Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get AI-powered help with content creation, editing, and optimization.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-white/20">
                <MessageSquare className="w-4 h-4 mr-2" />
                Improve Text Content
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20">
                <Image className="w-4 h-4 mr-2" />
                Generate Image Ideas
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20">
                <Video className="w-4 h-4 mr-2" />
                Video Script Helper
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              Content Approval Workflow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Review, edit, and approve content before it goes live.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <span className="text-sm">3 posts pending review</span>
                <Button size="sm" variant="outline" className="border-yellow-500/20">
                  Review
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/20 rounded">
                <span className="text-sm">5 posts approved</span>
                <Button size="sm" variant="outline" className="border-green-500/20">
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="glass-strong border-white/20 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="What would you like to share?"
                className="bg-black/20 border-white/20 h-32"
              />
              <Button
                onClick={generateAIContent}
                size="sm"
                variant="outline"
                className="mt-2 border-purple-500/20 text-purple-400"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Enhance with AI
              </Button>
            </div>

            <div>
              <Label>Content Type</Label>
              <Select value={formData.contentType} onValueChange={(value: 'text' | 'image' | 'video') => setFormData(prev => ({ ...prev, contentType: value }))}>
                <SelectTrigger className="bg-black/20 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="text">Text Only</SelectItem>
                  <SelectItem value="image">With Image</SelectItem>
                  <SelectItem value="video">With Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Platforms</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {PLATFORMS.map((platform) => (
                  <Button
                    key={platform.id}
                    variant="outline"
                    className={`justify-start border-white/20 ${
                      formData.platforms.includes(platform.id) ? 'bg-purple-500/20 border-purple-400' : ''
                    }`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        platforms: prev.platforms.includes(platform.id)
                          ? prev.platforms.filter(p => p !== platform.id)
                          : [...prev.platforms, platform.id]
                      }));
                    }}
                  >
                    <platform.icon className={`w-4 h-4 mr-2 ${platform.color}`} />
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost} className="bg-gradient-to-r from-blue-500 to-indigo-500">
                Create Draft
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Content Ideas Dialog */}
      <Dialog open={isIdeaGeneratorOpen} onOpenChange={setIsIdeaGeneratorOpen}>
        <DialogContent className="glass-strong border-white/20 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              AI Content Ideas Generator
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter a topic or let AI suggest ideas..."
                value={ideaPrompt}
                onChange={(e) => setIdeaPrompt(e.target.value)}
                className="bg-black/20 border-white/20 flex-1"
              />
              <Button
                onClick={generateContentIdeas}
                disabled={isGeneratingIdeas}
                className="bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                {isGeneratingIdeas ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </div>

            {contentIdeas.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentIdeas.map((idea) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="glass border-white/10 hover:border-purple-400/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium">{idea.title}</h4>
                          {idea.trending && (
                            <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                              Trending
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {idea.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {idea.platforms.map((platformId) => {
                              const platform = PLATFORMS.find(p => p.id === platformId);
                              return platform ? (
                                <platform.icon key={platformId} className={`w-4 h-4 ${platform.color}`} />
                              ) : null;
                            })}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => useContentIdea(idea)}
                            className="bg-gradient-to-r from-purple-500 to-indigo-500"
                          >
                            Use Idea
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
