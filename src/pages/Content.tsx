import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  MessageSquare,
  CheckCircle,
  XCircle,
  Calendar,
  Bot,
  Sparkles,
  TrendingUp,
  Settings,
  Plus,
  HelpCircle,
  ArrowRight,
  Image,
  Video,
  Download,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Target,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useStore } from '../store/useStore';
import { useToast } from '../hooks/use-toast';
import { BusinessAISetup } from '../components/BusinessAISetup';
import { SemiAutomaticContent } from '../components/SemiAutomaticContent';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' }
];

export const Content: React.FC = () => {
  const { draftPosts, addDraftPost, deleteDraftPost, addScheduledPost } = useStore();
  const { toast } = useToast();
  
  // Automation States
  const [automationMode, setAutomationMode] = useState<'fully-auto' | 'semi-auto'>('fully-auto');
  const [isAutomationActive, setIsAutomationActive] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBusinessSetupOpen, setIsBusinessSetupOpen] = useState(false);
  
  // Business Setup
  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const [isBusinessSetup, setIsBusinessSetup] = useState(false);
  
  // Automation Settings
  const [automationSettings, setAutomationSettings] = useState({
    platforms: [] as string[],
    postFrequency: 'daily',
    contentTypes: ['text', 'image', 'video'] as string[],
    postingTimes: ['09:00', '15:00', '19:00'],
    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    approvalRequired: true
  });

  const handleBusinessSetup = (profile: any) => {
    setBusinessProfile(profile);
    setIsBusinessSetup(true);
    setIsBusinessSetupOpen(false);
    toast({
      title: "Business AI Trained Successfully!",
      description: "Your AI assistant now understands your business and is ready to create content."
    });
  };

  const handleStartAutomation = async () => {
    if (!isBusinessSetup || automationSettings.platforms.length === 0) {
      toast({
        title: "Setup Required",
        description: "Complete business setup and select platforms first."
      });
      return;
    }

    setIsAutomationActive(true);
    toast({
      title: "Automation Started",
      description: `${automationMode === 'fully-auto' ? 'Fully' : 'Semi'}-automated social media management is now active.`
    });

    handleGenerateContent();
  };

  const handleStopAutomation = () => {
    setIsAutomationActive(false);
    toast({
      title: "Automation Stopped",
      description: "Social media automation has been paused."
    });
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const contentCount = automationSettings.postFrequency === 'daily' ? 7 : 
                          automationSettings.postFrequency === 'weekly' ? 3 : 1;
      
      for (let i = 0; i < contentCount; i++) {
        const hasImage = automationSettings.contentTypes.includes('image');
        const hasVideo = automationSettings.contentTypes.includes('video');
        const mediaType = hasVideo && Math.random() > 0.7 ? 'video' : 
                         hasImage && Math.random() > 0.5 ? 'image' : null;
        
        let content = '';
        let media: string[] = [];
        
        if (businessProfile) {
          const topics = [
            `${businessProfile.industry} insights`,
            `${businessProfile.goals} strategies`,
            `${businessProfile.targetAudience} tips`,
            `${businessProfile.keywords} trends`
          ];
          
          const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
          
          if (mediaType === 'video') {
            content = `🎥 ${businessProfile.brandVoice} video about ${selectedTopic}. Engaging content designed for ${businessProfile.targetAudience} to drive ${businessProfile.goals}.`;
            media = [`https://sample-videos.com/zip/10/mp4/SampleVideo_${Date.now() + i}.mp4`];
          } else if (mediaType === 'image') {
            content = `📸 Visual showcase of ${selectedTopic}. ${businessProfile.brandVoice} content crafted for ${businessProfile.targetAudience}.`;
            media = [`https://images.unsplash.com/photo-${Date.now() + i}?w=1080&h=1080&fit=crop`];
          } else {
            content = `✨ ${businessProfile.brandVoice} post about ${selectedTopic}. Perfect for ${businessProfile.targetAudience} interested in ${businessProfile.industry}.`;
          }
        } else {
          content = `🚀 Automated content post #${i + 1}. Engaging social media content created by AI.`;
        }

        addDraftPost({
          content,
          platforms: automationSettings.platforms as ('instagram' | 'facebook' | 'twitter' | 'linkedin')[],
          media
        });
      }

      toast({
        title: "Content Generated!",
        description: `${contentCount} posts created automatically based on your business profile.`
      });

      setIsGenerating(false);
    }, 3000);
  };

  const handleAutoApprove = (draftId: string) => {
    const draft = draftPosts.find(p => p.id === draftId);
    if (draft) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const randomTime = automationSettings.postingTimes[Math.floor(Math.random() * automationSettings.postingTimes.length)];
      const [hours, minutes] = randomTime.split(':').map(Number);
      tomorrow.setHours(hours, minutes, 0, 0);

      addScheduledPost({
        content: draft.content,
        platforms: draft.platforms,
        scheduled_at: tomorrow.toISOString(),
        status: 'scheduled',
        media: draft.media
      });

      deleteDraftPost(draftId);

      toast({
        title: "Auto-Scheduled",
        description: `Post scheduled for ${tomorrow.toLocaleString()}`
      });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Social Media Manager
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Fully automated and semi-automated social media management powered by AI
        </p>
      </motion.div>

      <Tabs value={automationMode} onValueChange={(value) => setAutomationMode(value as 'fully-auto' | 'semi-auto')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="fully-auto" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Fully Automated
          </TabsTrigger>
          <TabsTrigger value="semi-auto" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Semi-Automated
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fully-auto" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Setup Section */}
            <div className="lg:col-span-2 space-y-6">
              {!isBusinessSetup ? (
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      Business AI Training Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center py-8">
                    <div className="max-w-md mx-auto space-y-4">
                      <Brain className="w-16 h-16 text-purple-400 mx-auto" />
                      <h3 className="text-xl font-semibold">Train Your Business AI</h3>
                      <p className="text-muted-foreground">
                        Let AI learn about your business, audience, and goals to create personalized content automatically.
                      </p>
                      <Button 
                        onClick={() => setIsBusinessSetupOpen(true)}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Start AI Training
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-400" />
                      Fully Automated System
                      {isAutomationActive && (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                          Active
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Platform Selection */}
                    <div>
                      <Label className="text-base font-medium mb-3 block">Social Media Platforms</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {PLATFORMS.map((platform) => (
                          <Button
                            key={platform.id}
                            variant="outline"
                            className={`glass border-white/20 justify-start h-12 ${
                              automationSettings.platforms.includes(platform.id) ? 'bg-purple-500/20 border-purple-400' : ''
                            }`}
                            onClick={() => {
                              setAutomationSettings(prev => ({
                                ...prev,
                                platforms: prev.platforms.includes(platform.id)
                                  ? prev.platforms.filter(p => p !== platform.id)
                                  : [...prev.platforms, platform.id]
                              }));
                            }}
                          >
                            <platform.icon className={`w-5 h-5 mr-3 ${platform.color}`} />
                            {platform.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Automation Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Post Frequency</Label>
                        <Select value={automationSettings.postFrequency} onValueChange={(value) => setAutomationSettings(prev => ({ ...prev, postFrequency: value }))}>
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="daily">Daily (7 posts/week)</SelectItem>
                            <SelectItem value="weekly">Weekly (3 posts/week)</SelectItem>
                            <SelectItem value="bi-weekly">Bi-weekly (1 post/week)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Content Types</Label>
                        <div className="flex gap-2 mt-2">
                          {[
                            { id: 'text', label: 'Text', icon: MessageSquare },
                            { id: 'image', label: 'Images', icon: Image },
                            { id: 'video', label: 'Videos', icon: Video }
                          ].map((type) => (
                            <Button
                              key={type.id}
                              variant="outline"
                              size="sm"
                              className={`${
                                automationSettings.contentTypes.includes(type.id) ? 'bg-blue-500/20 border-blue-400' : 'border-white/20'
                              }`}
                              onClick={() => {
                                setAutomationSettings(prev => ({
                                  ...prev,
                                  contentTypes: prev.contentTypes.includes(type.id)
                                    ? prev.contentTypes.filter(t => t !== type.id)
                                    : [...prev.contentTypes, type.id]
                                }));
                              }}
                            >
                              <type.icon className="w-4 h-4" />
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label>Approval Required</Label>
                        <Switch
                          checked={automationSettings.approvalRequired}
                          onCheckedChange={(checked) => setAutomationSettings(prev => ({ ...prev, approvalRequired: checked }))}
                        />
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex gap-4">
                      {!isAutomationActive ? (
                        <Button 
                          onClick={handleStartAutomation}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 h-12"
                          disabled={automationSettings.platforms.length === 0}
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Start Full Automation
                        </Button>
                      ) : (
                        <>
                          <Button 
                            onClick={handleStopAutomation}
                            variant="outline"
                            className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10 h-12"
                          >
                            <Pause className="w-5 h-5 mr-2" />
                            Pause Automation
                          </Button>
                          <Button 
                            onClick={handleGenerateContent}
                            disabled={isGenerating}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 h-12"
                          >
                            {isGenerating ? (
                              <>
                                <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                                Generating...
                              </>
                            ) : (
                              <>
                                <RotateCcw className="w-5 h-5 mr-2" />
                                Generate Now
                              </>
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Generated Content */}
            <div>
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-purple-400" />
                      Generated Content
                    </span>
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                      {draftPosts.length} ready
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {draftPosts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No content generated yet</p>
                      <p className="text-sm">Start automation to generate content</p>
                    </div>
                  ) : (
                    draftPosts.map((draft) => (
                      <motion.div
                        key={draft.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-black/20 rounded-lg border border-white/10 space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                            Auto-Generated
                          </span>
                          <div className="flex gap-1">
                            {draft.platforms.map((platformId) => {
                              const platform = PLATFORMS.find(p => p.id === platformId);
                              return platform ? (
                                <platform.icon key={platformId} className={`w-3 h-3 ${platform.color}`} />
                              ) : null;
                            })}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {draft.content.substring(0, 120)}...
                          </p>
                          {draft.media && draft.media.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-blue-400">
                              {draft.media[0].includes('mp4') ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                              Media attached
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAutoApprove(draft.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Auto-Schedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteDraftPost(draft.id)}
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="semi-auto" className="space-y-6">
          <SemiAutomaticContent />
        </TabsContent>
      </Tabs>

      {/* Business AI Setup Dialog */}
      <BusinessAISetup
        isOpen={isBusinessSetupOpen}
        onClose={() => setIsBusinessSetupOpen(false)}
        onComplete={handleBusinessSetup}
      />
    </div>
  );
};

export default Content;
