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
  Plus,
  HelpCircle,
  ArrowRight,
  Image,
  Video,
  Download
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useStore } from '../store/useStore';
import { useToast } from '../hooks/use-toast';

export const Content: React.FC = () => {
  const { draftPosts, addDraftPost, deleteDraftPost, addScheduledPost } = useStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('business-ai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessInfo, setBusinessInfo] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generatedVideos, setGeneratedVideos] = useState<string[]>([]);
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
    },
    {
      question: "Who are your main competitors?",
      placeholder: "List companies you compete with and what differentiates you",
      type: "text"
    },
    {
      question: "What is your company's mission or vision?",
      placeholder: "What drives your business and what impact do you want to make?",
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

  const handleBusinessAIGenerate = async () => {
    if (!businessInfo.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      addDraftPost({
        content: `AI learned from your business profile and created: "${businessInfo.substring(0, 50)}..." - This is AI-generated business content based on your industry insights and target audience preferences.`,
        platforms: ['linkedin'],
        media: []
      });

      toast({
        title: "Draft Created",
        description: "AI has created a business content draft. Check the Post Scheduler to schedule it!"
      });

      setIsGenerating(false);
      setBusinessInfo('');
    }, 3000);
  };

  const handleCustomPromptGenerate = async () => {
    if (!customPrompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      addDraftPost({
        content: `Custom content generated from prompt: "${customPrompt.substring(0, 50)}..." - This content was specifically created based on your custom requirements and messaging needs.`,
        platforms: ['twitter'],
        media: []
      });

      toast({
        title: "Draft Created", 
        description: "Custom content draft created. Check the Post Scheduler to schedule it!"
      });

      setIsGenerating(false);
      setCustomPrompt('');
    }, 2000);
  };

  const handleImageGenerate = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      // Simulate image generation with placeholder
      const newImage = `https://images.unsplash.com/photo-${Date.now()}?w=512&h=512&fit=crop`;
      setGeneratedImages(prev => [...prev, newImage]);
      
      addDraftPost({
        content: `Generated image from prompt: "${imagePrompt}" - Perfect for visual storytelling and engaging your audience.`,
        platforms: ['instagram'],
        media: [newImage]
      });

      toast({
        title: "Image Generated",
        description: "AI image has been generated and added to drafts!"
      });

      setIsGenerating(false);
      setImagePrompt('');
    }, 3000);
  };

  const handleVideoGenerate = async () => {
    if (!videoPrompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      // Simulate video generation with placeholder
      const newVideo = `https://sample-videos.com/zip/10/mp4/SampleVideo_${Date.now()}.mp4`;
      setGeneratedVideos(prev => [...prev, newVideo]);
      
      addDraftPost({
        content: `Generated video from prompt: "${videoPrompt}" - Dynamic video content to boost engagement and reach.`,
        platforms: ['instagram', 'facebook'],
        media: [newVideo]
      });

      toast({
        title: "Video Generated",
        description: "AI video has been generated and added to drafts!"
      });

      setIsGenerating(false);
      setVideoPrompt('');
    }, 5000);
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
          AI Content Studio
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create text, images, and videos with AI. Generate personalized content or use custom prompts for any creative need.
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
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger 
                    value="business-ai" 
                    className="flex items-center gap-2 data-[state=active]:bg-purple-500/20"
                  >
                    <Brain className="w-4 h-4" />
                    Business AI
                  </TabsTrigger>
                  <TabsTrigger 
                    value="custom-prompt"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Custom Text
                  </TabsTrigger>
                  <TabsTrigger 
                    value="image-gen"
                    className="flex items-center gap-2 data-[state=active]:bg-green-500/20"
                  >
                    <Image className="w-4 h-4" />
                    AI Images
                  </TabsTrigger>
                  <TabsTrigger 
                    value="video-gen"
                    className="flex items-center gap-2 data-[state=active]:bg-red-500/20"
                  >
                    <Video className="w-4 h-4" />
                    AI Videos
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
                          Answer AI's questions about your business so it can learn your industry, audience, and brand voice to create perfect content.
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

                  {!showQuestionnaire && !businessInfo ? (
                    <div className="text-center space-y-4">
                      <div className="bg-black/20 border border-white/10 rounded-lg p-8">
                        <HelpCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Let AI Learn Your Business</h3>
                        <p className="text-muted-foreground mb-6">
                          AI will ask you {businessQuestions.length} targeted questions to understand your business completely.
                        </p>
                        <Button 
                          onClick={handleStartQuestionnaire}
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Start Business Interview
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
                              AI Question {currentQuestionIndex + 1} of {businessQuestions.length}
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
                            {currentQuestionIndex === businessQuestions.length - 1 ? 'Complete Interview' : 'Next Question'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">Business Profile Complete!</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          AI has learned about your business and is ready to generate personalized content.
                        </p>
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
                        disabled={isGenerating}
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                            AI is Creating Content...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            Generate Business Content
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
                        Retake Business Interview
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Custom Prompt Tab */}
                <TabsContent value="custom-prompt" className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-lg border border-blue-500/20">
                    <div className="flex items-start gap-4">
                      <MessageSquare className="w-8 h-8 text-blue-400 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">
                          Create Custom Text Content
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Write specific prompts to generate exactly the content you need. 
                          Perfect for one-off posts, campaigns, or unique content requirements.
                        </p>
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

                {/* Image Generation Tab */}
                <TabsContent value="image-gen" className="space-y-6">
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-lg border border-green-500/20">
                    <div className="flex items-start gap-4">
                      <Image className="w-8 h-8 text-green-400 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2">
                          AI Image Generation
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Create stunning visuals with AI. Perfect for social media posts, marketing materials, and creative content.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Image Description</Label>
                      <Textarea
                        placeholder="Describe the image you want: style, colors, objects, mood, lighting, etc. Be as detailed as possible for better results."
                        className="mt-2 h-24 bg-black/20 border-white/20"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Style</Label>
                        <Select defaultValue="realistic">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="realistic">Realistic</SelectItem>
                            <SelectItem value="artistic">Artistic</SelectItem>
                            <SelectItem value="cartoon">Cartoon</SelectItem>
                            <SelectItem value="abstract">Abstract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Resolution</Label>
                        <Select defaultValue="1024x1024">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="512x512">512×512</SelectItem>
                            <SelectItem value="1024x1024">1024×1024</SelectItem>
                            <SelectItem value="1024x768">1024×768</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quality</Label>
                        <Select defaultValue="high">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="ultra">Ultra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={handleImageGenerate}
                      disabled={isGenerating || !imagePrompt.trim()}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                          Generating Image...
                        </>
                      ) : (
                        <>
                          <Image className="w-4 h-4 mr-2" />
                          Generate Image
                        </>
                      )}
                    </Button>

                    {generatedImages.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Generated Images</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {generatedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={image} 
                                alt={`Generated ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-white/10"
                              />
                              <Button
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                  // Download functionality would go here
                                  toast({
                                    title: "Download Started",
                                    description: "Image download has started"
                                  });
                                }}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Video Generation Tab */}
                <TabsContent value="video-gen" className="space-y-6">
                  <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 p-6 rounded-lg border border-red-500/20">
                    <div className="flex items-start gap-4">
                      <Video className="w-8 h-8 text-red-400 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-red-400 mb-2">
                          AI Video Generation
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Create engaging video content with AI. Perfect for social media, presentations, and marketing campaigns.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Video Description</Label>
                      <Textarea
                        placeholder="Describe the video you want: scene, actions, style, duration, etc. Include details about movement, camera angles, and visual effects."
                        className="mt-2 h-24 bg-black/20 border-white/20"
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Duration</Label>
                        <Select defaultValue="5s">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="5s">5 seconds</SelectItem>
                            <SelectItem value="10s">10 seconds</SelectItem>
                            <SelectItem value="15s">15 seconds</SelectItem>
                            <SelectItem value="30s">30 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Resolution</Label>
                        <Select defaultValue="1080p">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="720p">720p HD</SelectItem>
                            <SelectItem value="1080p">1080p Full HD</SelectItem>
                            <SelectItem value="4k">4K Ultra HD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Style</Label>
                        <Select defaultValue="cinematic">
                          <SelectTrigger className="bg-black/20 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/20">
                            <SelectItem value="cinematic">Cinematic</SelectItem>
                            <SelectItem value="animation">Animation</SelectItem>
                            <SelectItem value="realistic">Realistic</SelectItem>
                            <SelectItem value="artistic">Artistic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={handleVideoGenerate}
                      disabled={isGenerating || !videoPrompt.trim()}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                          Generating Video...
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Generate Video
                        </>
                      )}
                    </Button>

                    {generatedVideos.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Generated Videos</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {generatedVideos.map((video, index) => (
                            <div key={index} className="relative group">
                              <video 
                                src={video}
                                className="w-full h-48 object-cover rounded-lg border border-white/10"
                                controls
                                poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
                              />
                              <Button
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                  toast({
                                    title: "Download Started",
                                    description: "Video download has started"
                                  });
                                }}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
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
                  Review Draft Posts
                </span>
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                  {draftPosts.length} drafts
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {draftPosts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No draft posts yet</p>
                  <p className="text-sm">Generate content to see drafts here</p>
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
                        Draft Post
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {draft.platforms.join(', ')}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {draft.content.substring(0, 100)}...
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
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">This Month</span>
                <span className="font-bold">47 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Draft Posts</span>
                <span className="font-bold text-yellow-400">{draftPosts.length}</span>
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
