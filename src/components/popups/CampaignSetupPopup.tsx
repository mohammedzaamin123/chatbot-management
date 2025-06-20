
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Target, DollarSign } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface CampaignSetupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignSetupPopup: React.FC<CampaignSetupPopupProps> = ({
  isOpen,
  onClose
}) => {
  const { addCampaign } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    platform: 'meta' as 'meta' | 'google' | 'all',
    budget: '',
    objective: 'awareness',
    target_audience: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addCampaign({
      name: formData.name,
      status: 'active',
      budget: parseFloat(formData.budget),
      platform: formData.platform,
      spent: 0,
      reach: 0,
      ctr: 0,
      roi: 0
    });
    
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Campaign"
      description="Set up your marketing campaign with targeting and budget"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter campaign name"
              required
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget ($)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={formData.platform}
              onValueChange={(value: 'meta' | 'google' | 'all') => 
                setFormData({ ...formData, platform: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meta">Meta (Facebook & Instagram)</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="all">All Platforms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="objective">Campaign Objective</Label>
            <Select
              value={formData.objective}
              onValueChange={(value) => setFormData({ ...formData, objective: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="traffic">Website Traffic</SelectItem>
                <SelectItem value="conversions">Conversions</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="leads">Lead Generation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="target_audience">Target Audience</Label>
          <Input
            id="target_audience"
            value={formData.target_audience}
            onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
            placeholder="e.g., Ages 25-45, Business owners, Tech enthusiasts"
          />
        </div>

        <div>
          <Label htmlFor="description">Campaign Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your campaign goals and strategy"
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="btn-primary">
            <Target className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </form>
    </Popup>
  );
};
