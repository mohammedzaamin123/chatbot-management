
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Users, Building, Settings } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface TenantManagementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId?: string;
}

export const TenantManagementPopup: React.FC<TenantManagementPopupProps> = ({
  isOpen,
  onClose,
  tenantId
}) => {
  const { addTenant, updateTenant, tenants } = useStore();
  const existingTenant = tenantId ? tenants.find(t => t.id === tenantId) : null;
  
  const [formData, setFormData] = useState({
    name: existingTenant?.name || '',
    plan: existingTenant?.plan || 'free' as 'free' | 'pro' | 'enterprise',
    is_active: existingTenant?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const limits = {
      free: { messages: 1000, posts: 50, storage: 1 },
      pro: { messages: 10000, posts: 500, storage: 5 },
      enterprise: { messages: 100000, posts: 5000, storage: 50 }
    };

    if (existingTenant) {
      updateTenant(existingTenant.id, {
        ...formData,
        limits: limits[formData.plan]
      });
    } else {
      addTenant({
        ...formData,
        usage: { messages: 0, posts: 0, storage: 0 },
        limits: limits[formData.plan]
      });
    }
    
    onClose();
  };

  const planFeatures = {
    free: ['1,000 messages/month', '50 posts/month', '1GB storage', 'Basic support'],
    pro: ['10,000 messages/month', '500 posts/month', '5GB storage', 'Priority support', 'Advanced analytics'],
    enterprise: ['100,000 messages/month', '5,000 posts/month', '50GB storage', '24/7 support', 'Custom integrations', 'White-label options']
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={existingTenant ? 'Edit Tenant' : 'Add New Tenant'}
      description="Configure tenant settings and plan details"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Tenant Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Company Name"
              required
            />
          </div>

          <div>
            <Label htmlFor="plan">Plan</Label>
            <Select
              value={formData.plan}
              onValueChange={(value: 'free' | 'pro' | 'enterprise') => 
                setFormData({ ...formData, plan: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free Plan</SelectItem>
                <SelectItem value="pro">Pro Plan</SelectItem>
                <SelectItem value="enterprise">Enterprise Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Plan Features</Label>
          <div className="p-4 rounded-lg bg-muted/50">
            <ul className="space-y-2 text-sm">
              {planFeatures[formData.plan].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {existingTenant && (
          <div className="space-y-3">
            <Label>Current Usage</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Messages</span>
                  <span>{existingTenant.usage.messages.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(existingTenant.usage.messages / existingTenant.limits.messages) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Posts</span>
                  <span>{existingTenant.usage.posts}</span>
                </div>
                <Progress 
                  value={(existingTenant.usage.posts / existingTenant.limits.posts) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span>{existingTenant.usage.storage}GB</span>
                </div>
                <Progress 
                  value={(existingTenant.usage.storage / existingTenant.limits.storage) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="is_active">Tenant is active</Label>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="btn-primary">
            <Building className="w-4 h-4 mr-2" />
            {existingTenant ? 'Update Tenant' : 'Add Tenant'}
          </Button>
        </div>
      </form>
    </Popup>
  );
};
