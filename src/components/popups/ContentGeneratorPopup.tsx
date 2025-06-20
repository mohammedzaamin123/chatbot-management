
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Sparkles, Wand2 } from 'lucide-react';

interface ContentGeneratorPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContentGeneratorPopup: React.FC<ContentGeneratorPopupProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    platforms: [] as string[],
    contentType: 'post',
    includeHashtags: true,
    includeEmojis: false
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const sampleContent = `🚀 Exciting news about ${formData.topic}! 

Our latest insights show incredible potential in this space. Here's what you need to know:

✨ Key benefits include improved efficiency and better user experience
📈 Market trends indicate significant growth opportunities
💡 Innovation is driving remarkable changes

What are your thoughts on this development?

#${formData.topic.replace(/\s+/g, '')} #Innovation #Growth #Business`;
      
      setGeneratedContent(sampleContent);
      setIsGenerating(false);
    }, 2000);
  };

  const platformOptions = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'linkedin', label: 'LinkedIn' }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="AI Content Generator"
      description="Generate engaging content for your social media platforms"
      size="lg"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="topic">Topic/Subject</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="Enter your topic"
            />
          </div>

          <div>
            <Label htmlFor="tone">Tone</Label>
            <Select
              value={formData.tone}
              onValueChange={(value) => setFormData({ ...formData, tone: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Target Platforms</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {platformOptions.map((platform) => (
              <div key={platform.id} className="flex items-center space-x-2">
                <Checkbox
                  id={platform.id}
                  checked={formData.platforms.includes(platform.id)}
                  onCheckedChange={() => handlePlatformToggle(platform.id)}
                />
                <Label htmlFor={platform.id}>{platform.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hashtags"
              checked={formData.includeHashtags}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, includeHashtags: checked as boolean })
              }
            />
            <Label htmlFor="hashtags">Include Hashtags</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="emojis"
              checked={formData.includeEmojis}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, includeEmojis: checked as boolean })
              }
            />
            <Label htmlFor="emojis">Include Emojis</Label>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!formData.topic || isGenerating}
          className="w-full btn-primary"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-3">
            <Label>Generated Content</Label>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {generatedContent && (
          <Button className="btn-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            Save Content
          </Button>
        )}
      </div>
    </Popup>
  );
};
