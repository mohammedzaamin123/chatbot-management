
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
  Linkedin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useStore } from '../store/useStore';
import { useToast } from '../hooks/use-toast';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' }
];

export const Content: React.FC = () => {
  const { draftPosts, addDraftPost, deleteDraftPost, addScheduledPost } = useStore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessInfo, setBusinessInfo] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [contentFrequency, setContentFrequency] = useState('daily');
  const [contentTypes, setContentTypes] = useState<string[]>(['text', 'image', 'video']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [businessAnswers, setBusinessAnswers] = useState<Record<number, string>>({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const businessQuestions = [
    {
      question: "What industry is your business in?",
      placeholder: "e.g., Technology, Healthcare, Finance, E-commerce, etc.",
      type: "text"
    },
    {
      question: "What products or services do you offer?",
      placeholder: "Describe your main offerings and what makes them unique",
      type: "textarea"
    },
    {
      question: "Who is your target audience?",
      placeholder: "e.g., Small business owners, Tech professionals, Young families, etc.",
      type: "text"
    },
    {
      question: "What is your brand voice and tone?",
      placeholder: "e.g., Professional, Friendly, Casual, Authoritative, Innovative, etc.",
      type: "text"
    },
    {
      question: "What are your main business goals?",
      placeholder: "e.g., Increase brand awareness, Generate leads, Drive sales, etc.",
      type: "textarea"
    },
    {
      question: "What topics should your content focus on?",
      placeholder: "e.g., Industry trends, Product features, Customer success stories, etc.",
      type: "textarea"
    }
  ];

  const handleStartQuestionnaire = () => {
    setShowQuestionnaire(true);
    setCurrentQuestionIndex(0);
    setBusinessAnswers({});
  };

  const handleAnswerChange = (answer: string) => {
    setBusinessAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < businessQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const allAnswers = Object.values(businessAnswers).join('\n\n');
      setBusinessInfo(allAnswers);
      setShowQuestionnaire(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContentTypeToggle = (contentType: string) => {
    setContentTypes(prev => 
      prev.includes(contentType) 
        ? prev.filter(t => t !== contentType)
        : [...prev, contentType]
    );
  };

  const handleAutomatedGeneration = async () => {
    if (!businessInfo.trim() || selectedPlatforms.length === 0) {
      toast({
        title: "Setup Required",
        description: "Please complete business setup and select platforms first."
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI content generation process
    setTimeout(() => {
      const contentCount = contentFrequency === 'daily' ? 5 : contentFrequency === 'weekly' ? 3 : 1;
      
      for (let i = 0; i < contentCount; i++) {
        const hasImage = contentTypes.includes('image');
        const hasVideo = contentTypes.includes('video');
        const mediaType = hasVideo ? 'video' : hasImage ? 'image' : null;
        
        let content = '';
        let media: string[] = [];
        
        if (mediaType === 'video') {
          content = `🎥 Automated video content about ${businessAnswers[0] || 'your business'} - AI-generated engaging video content tailored for your audience and brand voice.`;
          media = [`https://sample-videos.com/zip/10/mp4/SampleVideo_${Date.now() + i}.mp4`];
        } else if (mediaType === 'image') {
          content = `📸 Visual content showcasing ${businessAnswers[1]?.substring(0, 30) || 'your products'} - AI-generated image content designed to engage your target audience.`;
          media = [`https://images.unsplash.com/photo-${Date.now() + i}?w=1080&h=1080&fit=crop`];
        } else {
          content = `✨ ${businessAnswers[3] || 'Professional'} post about ${businessAnswers[5]?.substring(0, 50) || 'industry insights'} - Crafted specifically for your brand voice and business goals.`;
        }

        addDraftPost({
          content,
          platforms: selectedPlatforms as ('instagram' | 'facebook' | 'twitter' | 'linkedin')[],
          media
        });
      }

      toast({
        title: "Content Generated!",
        description: `${contentCount} automated posts created and ready for review in the scheduler.`
      });

      setIsGenerating(false);
    }, 4000);
  };

  const handleApproveDraft = (draftId: string) => {
    const draft = draftPosts.find(p => p.id === draftId);
    if (draft) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(12, 0, 0, 0);

      addScheduledPost({
        content: draft.content,
        platforms: draft.platforms,
        scheduled_at: tomorrow.toISOString(),
        status: 'scheduled',
        media: draft.media
      });

      deleteDraftPost(draftId);

      toast({
        title: "Post Scheduled",
        description: "Draft has been approved and scheduled for tomorrow at 12:00 PM"
      });
    }
  };

  const handleDeleteDraft = (draftId: string) => {
    deleteDraftPost(draftId);
    toast({
      title: "Draft Deleted",
      description: "Draft post has been removed"
    });
  };

  const currentQuestion = businessQuestions[currentQuestionIndex];
  const currentAnswer = businessAnswers[currentQuestionIndex] || '';

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Business Content Automation
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Fully automated content creation system that generates posts, images, and videos tailored to your business
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Setup Area */}
        <div className="lg:col-span-2">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Automated Content System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business AI Learning Section */}
              <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-6 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-4">
                  <Bot className="w-8 h-8 text-purple-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">
                      Step 1: Business Intelligence Setup
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Train AI to understand your business completely for fully automated content generation.
                    </p>
                  </div>
                </div>
              </div>

              {!showQuestionnaire && !businessInfo ? (
                <div className="text-center space-y-4">
                  <div className="bg-black/20 border border-white/10 rounded-lg p-8">
                    <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Initialize AI Business Training</h3>
                    <p className="text-muted-foreground mb-6">
                      AI will learn your business through {businessQuestions.length} strategic questions for automated content creation.
                    </p>
                    <Button 
                      onClick={handleStartQuestionnaire}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Start AI Training
                    </Button>
                  </div>
                </div>
              ) : showQuestionnaire ? (
                <div className="space-y-6">
                  <div className="bg-black/20 border border-white/10 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-purple-400 font-medium">
                          AI Training {currentQuestionIndex + 1} of {businessQuestions.length}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(((currentQuestionIndex + 1) / businessQuestions.length) * 100)}% Complete
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / businessQuestions.length) * 100}%` }}
                      ></div>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                    
                    {currentQuestion.type === 'textarea' ? (
                      <Textarea
                        placeholder={currentQuestion.placeholder}
                        className="bg-black/20 border-white/20 h-24"
                        value={currentAnswer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                      />
                    ) : (
                      <Input
                        placeholder={currentQuestion.placeholder}
                        className="bg-black/20 border-white/20"
                        value={currentAnswer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                      />
                    )}

                    <div className="flex justify-between items-center mt-6">
                      <Button
                        variant="outline"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="border-white/20"
                      >
                        Previous
                      </Button>
                      
                      <Button
                        onClick={handleNextQuestion}
                        disabled={!currentAnswer.trim()}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                      >
                        {currentQuestionIndex === businessQuestions.length - 1 ? 'Complete Training' : 'Next Question'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">AI Training Complete!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI is now ready for fully automated content generation.
                    </p>
                  </div>

                  {/* Platform Selection */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Step 2: Select Social Media Platforms</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {PLATFORMS.map((platform) => (
                        <Button
                          key={platform.id}
                          variant="outline"
                          className={`glass border-white/20 justify-start h-12 ${
                            selectedPlatforms.includes(platform.id) ? 'bg-purple-500/20 border-purple-400' : ''
                          }`}
                          onClick={() => handlePlatformToggle(platform.id)}
                        >
                          <platform.icon className={`w-5 h-5 mr-3 ${platform.color}`} />
                          {platform.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Content Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Content Frequency</Label>
                      <Select value={contentFrequency} onValueChange={setContentFrequency}>
                        <SelectTrigger className="bg-black/20 border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20">
                          <SelectItem value="daily">Daily (5 posts)</SelectItem>
                          <SelectItem value="weekly">Weekly (3 posts)</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly (1 post)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium mb-3 block">Content Types</Label>
                      <div className="space-y-2">
                        {[
                          { id: 'text', label: 'Text Posts', icon: MessageSquare },
                          { id: 'image', label: 'AI Images', icon: Image },
                          { id: 'video', label: 'AI Videos', icon: Video }
                        ].map((type) => (
                          <Button
                            key={type.id}
                            variant="outline"
                            size="sm"
                            className={`w-full justify-start ${
                              contentTypes.includes(type.id) ? 'bg-blue-500/20 border-blue-400' : 'border-white/20'
                            }`}
                            onClick={() => handleContentTypeToggle(type.id)}
                          >
                            <type.icon className="w-4 h-4 mr-2" />
                            {type.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleAutomatedGeneration}
                    disabled={isGenerating || selectedPlatforms.length === 0}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 h-12 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"></div>
                        AI Creating Automated Content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Generate Automated Content
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setBusinessInfo('');
                      setBusinessAnswers({});
                      setCurrentQuestionIndex(0);
                    }}
                    className="w-full border-white/20"
                  >
                    Retrain AI Business Model
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Draft Posts Review */}
        <div className="space-y-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  Generated Content
                </span>
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                  {draftPosts.length} ready
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {draftPosts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No automated content yet</p>
                  <p className="text-sm">Complete setup to generate content</p>
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
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                        AI Generated
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
                        {draft.content.substring(0, 100)}...
                      </p>
                      {draft.media && draft.media.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-blue-400">
                          {draft.media[0].includes('mp4') ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                          Media included
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveDraft(draft.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteDraft(draft.id)}
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

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Automation Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Generated Today</span>
                <span className="font-bold text-purple-400">{draftPosts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Auto-Scheduled</span>
                <span className="font-bold text-green-400">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">AI Efficiency</span>
                <span className="font-bold text-blue-400">95%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Content;
