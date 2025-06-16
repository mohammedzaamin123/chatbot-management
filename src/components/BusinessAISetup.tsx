
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useToast } from '../hooks/use-toast';

interface BusinessProfile {
  industry: string;
  description: string;
  targetAudience: string;
  brandVoice: string;
  goals: string;
  keywords: string;
  contentPreferences: string[];
  postingFrequency: string;
  businessSize: string;
  mainProducts: string;
}

interface BusinessAISetupProps {
  onComplete: (profile: BusinessProfile) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CONTENT_TYPES = [
  { id: 'educational', label: 'Educational Content', description: 'Tips, tutorials, how-tos' },
  { id: 'promotional', label: 'Promotional Posts', description: 'Product features, offers' },
  { id: 'behind-scenes', label: 'Behind the Scenes', description: 'Company culture, process' },
  { id: 'user-generated', label: 'User-Generated', description: 'Customer stories, reviews' },
  { id: 'trending', label: 'Trending Topics', description: 'Industry news, viral content' },
  { id: 'inspirational', label: 'Inspirational', description: 'Motivational quotes, stories' }
];

export const BusinessAISetup: React.FC<BusinessAISetupProps> = ({ onComplete, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<BusinessProfile>({
    industry: '',
    description: '',
    targetAudience: '',
    brandVoice: '',
    goals: '',
    keywords: '',
    contentPreferences: [],
    postingFrequency: '',
    businessSize: '',
    mainProducts: ''
  });
  const { toast } = useToast();

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (!profile.industry || !profile.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least industry and business description."
      });
      return;
    }

    onComplete(profile);
    toast({
      title: "Business AI Trained Successfully!",
      description: "Your AI assistant now understands your business and is ready to create content."
    });
  };

  const toggleContentPreference = (id: string) => {
    setProfile(prev => ({
      ...prev,
      contentPreferences: prev.contentPreferences.includes(id)
        ? prev.contentPreferences.filter(p => p !== id)
        : [...prev.contentPreferences, id]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-6 h-6 text-purple-400" />
            Business AI Training
          </DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i + 1 <= currentStep ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Tell us about your business</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Industry *</Label>
                  <Select value={profile.industry} onValueChange={(value) => setProfile(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="bg-black/20 border-white/20">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Business Size</Label>
                  <Select value={profile.businessSize} onValueChange={(value) => setProfile(prev => ({ ...prev, businessSize: value }))}>
                    <SelectTrigger className="bg-black/20 border-white/20">
                      <SelectValue placeholder="Select business size" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                      <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium Business (51-200 employees)</SelectItem>
                      <SelectItem value="large">Large Business (200+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Business Description *</Label>
                <Textarea
                  placeholder="Describe what your business does, your products/services, and what makes you unique..."
                  value={profile.description}
                  onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-black/20 border-white/20 h-24"
                />
              </div>

              <div>
                <Label>Main Products/Services</Label>
                <Input
                  placeholder="e.g., Web development, Consulting services, E-commerce products"
                  value={profile.mainProducts}
                  onChange={(e) => setProfile(prev => ({ ...prev, mainProducts: e.target.value }))}
                  className="bg-black/20 border-white/20"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Target Audience & Brand Voice */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Define your audience and voice</h3>
              
              <div>
                <Label>Target Audience</Label>
                <Textarea
                  placeholder="Describe your ideal customers: demographics, interests, pain points, behavior..."
                  value={profile.targetAudience}
                  onChange={(e) => setProfile(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="bg-black/20 border-white/20 h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Brand Voice</Label>
                  <Select value={profile.brandVoice} onValueChange={(value) => setProfile(prev => ({ ...prev, brandVoice: value }))}>
                    <SelectTrigger className="bg-black/20 border-white/20">
                      <SelectValue placeholder="Select brand voice" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="professional">Professional & Authoritative</SelectItem>
                      <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                      <SelectItem value="casual">Casual & Conversational</SelectItem>
                      <SelectItem value="innovative">Innovative & Forward-thinking</SelectItem>
                      <SelectItem value="luxury">Luxury & Premium</SelectItem>
                      <SelectItem value="playful">Playful & Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Main Goals</Label>
                  <Select value={profile.goals} onValueChange={(value) => setProfile(prev => ({ ...prev, goals: value }))}>
                    <SelectTrigger className="bg-black/20 border-white/20">
                      <SelectValue placeholder="Select main goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                      <SelectItem value="lead-generation">Lead Generation</SelectItem>
                      <SelectItem value="sales">Drive Sales</SelectItem>
                      <SelectItem value="engagement">Increase Engagement</SelectItem>
                      <SelectItem value="education">Educate Audience</SelectItem>
                      <SelectItem value="community">Build Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Keywords & Topics</Label>
                <Input
                  placeholder="Enter relevant keywords, hashtags, and topics (comma separated)"
                  value={profile.keywords}
                  onChange={(e) => setProfile(prev => ({ ...prev, keywords: e.target.value }))}
                  className="bg-black/20 border-white/20"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Content Preferences */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Choose your content preferences</h3>
              <p className="text-sm text-muted-foreground">Select the types of content you want AI to create for you</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONTENT_TYPES.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all border ${
                      profile.contentPreferences.includes(type.id)
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/20 glass'
                    }`}
                    onClick={() => toggleContentPreference(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded border-2 mt-1 ${
                          profile.contentPreferences.includes(type.id)
                            ? 'bg-purple-500 border-purple-500'
                            : 'border-white/20'
                        }`}>
                          {profile.contentPreferences.includes(type.id) && (
                            <div className="w-full h-full flex items-center justify-center text-xs text-white">✓</div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{type.label}</h4>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Posting Frequency */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Set your posting frequency</h3>
              
              <div>
                <Label>How often do you want to post?</Label>
                <Select value={profile.postingFrequency} onValueChange={(value) => setProfile(prev => ({ ...prev, postingFrequency: value }))}>
                  <SelectTrigger className="bg-black/20 border-white/20">
                    <SelectValue placeholder="Select posting frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="multiple-daily">Multiple times per day</SelectItem>
                    <SelectItem value="daily">Once per day</SelectItem>
                    <SelectItem value="every-other-day">Every other day</SelectItem>
                    <SelectItem value="3-times-week">3 times per week</SelectItem>
                    <SelectItem value="weekly">Once per week</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-400 mb-2">AI Training Summary</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Industry:</span> {profile.industry || 'Not specified'}</p>
                  <p><span className="font-medium">Business Size:</span> {profile.businessSize || 'Not specified'}</p>
                  <p><span className="font-medium">Brand Voice:</span> {profile.brandVoice || 'Not specified'}</p>
                  <p><span className="font-medium">Main Goal:</span> {profile.goals || 'Not specified'}</p>
                  <p><span className="font-medium">Content Types:</span> {profile.contentPreferences.length} selected</p>
                  <p><span className="font-medium">Posting Frequency:</span> {profile.postingFrequency || 'Not specified'}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-white/10">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="border-white/20"
            >
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Complete AI Training
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
