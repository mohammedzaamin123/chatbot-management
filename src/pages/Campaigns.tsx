
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Play, Pause, BarChart3, DollarSign, Users, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addCampaign, updateCampaign } from '../store/slices/campaignSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { day: 'Mon', reach: 1200, clicks: 45, conversions: 8 },
  { day: 'Tue', reach: 1800, clicks: 72, conversions: 12 },
  { day: 'Wed', reach: 2200, clicks: 89, conversions: 15 },
  { day: 'Thu', reach: 1900, clicks: 65, conversions: 11 },
  { day: 'Fri', reach: 2800, clicks: 105, conversions: 22 },
  { day: 'Sat', reach: 3200, clicks: 128, conversions: 28 },
  { day: 'Sun', reach: 2600, clicks: 98, conversions: 19 }
];

export const Campaigns: React.FC = () => {
  const dispatch = useAppDispatch();
  const { campaigns } = useAppSelector((state) => state.campaign);
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'meta',
    budget: 0,
    target_audience: '',
    objective: 'awareness'
  });

  const handleCreateCampaign = () => {
    dispatch(addCampaign({
      name: formData.name,
      status: 'paused',
      platform: formData.platform as any,
      budget: formData.budget,
      spent: 0,
      reach: 0,
      ctr: 0,
      roi: 0
    }));
    
    setIsCreateOpen(false);
    setFormData({
      name: '',
      platform: 'meta',
      budget: 0,
      target_audience: '',
      objective: 'awareness'
    });
  };

  const toggleCampaignStatus = (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    dispatch(updateCampaign({ id: campaignId, updates: { status: newStatus } }));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">
            Ad Campaigns 🎯
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your advertising campaigns across platforms
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="neon-text">Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Campaign Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Q1 Product Launch"
                    className="glass border-white/20"
                  />
                </div>
                <div>
                  <Label>Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/20">
                      <SelectItem value="meta">Meta (Facebook/Instagram)</SelectItem>
                      <SelectItem value="google">Google Ads</SelectItem>
                      <SelectItem value="all">All Platforms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Budget ($)</Label>
                  <Input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    placeholder="1000"
                    className="glass border-white/20"
                  />
                </div>
                <div>
                  <Label>Objective</Label>
                  <Select
                    value={formData.objective}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, objective: value }))}
                  >
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/20">
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="traffic">Website Traffic</SelectItem>
                      <SelectItem value="conversions">Conversions</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Target Audience</Label>
                <Input
                  value={formData.target_audience}
                  onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value }))}
                  placeholder="Tech professionals, 25-45, interested in AI"
                  className="glass border-white/20"
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign} className="btn-primary">
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Spend',
            value: `$${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}`,
            change: '+12.5%',
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500'
          },
          {
            title: 'Total Reach',
            value: campaigns.reduce((sum, c) => sum + c.reach, 0).toLocaleString(),
            change: '+23.1%',
            icon: Eye,
            color: 'from-blue-500 to-cyan-500'
          },
          {
            title: 'Avg CTR',
            value: `${(campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length || 0).toFixed(1)}%`,
            change: '+8.3%',
            icon: Target,
            color: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Avg ROI',
            value: `${Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length || 0)}%`,
            change: '+15.7%',
            icon: BarChart3,
            color: 'from-yellow-500 to-orange-500'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    <p className="text-sm text-green-400 mt-1">{metric.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="glass-strong border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="reach" stroke="#8B5CF6" strokeWidth={3} />
              <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="conversions" stroke="#EC4899" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaigns List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">
                      {campaign.platform} • Created {new Date(campaign.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'active' ? 'status-active' : 
                    campaign.status === 'paused' ? 'status-pending' : 'status-inactive'
                  }`}>
                    {campaign.status}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Budget</div>
                    <div className="font-semibold">${campaign.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Spent</div>
                    <div className="font-semibold">${campaign.spent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                    <div className="font-semibold">${(campaign.budget - campaign.spent).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Reach</div>
                    <div className="font-semibold">{campaign.reach.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">CTR</div>
                    <div className="font-semibold">{campaign.ctr}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">ROI</div>
                    <div className="font-semibold text-green-400">{campaign.roi}%</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 glass border-white/20"
                    onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                  >
                    {campaign.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
