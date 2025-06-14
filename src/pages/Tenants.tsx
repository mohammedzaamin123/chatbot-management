
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Eye, Settings, Trash2, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useStore } from '../store/useStore';

export const Tenants: React.FC = () => {
  const { tenants, addTenant, updateTenant, deleteTenant } = useStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    plan: 'free',
    admin_email: ''
  });

  const handleCreateTenant = () => {
    addTenant({
      name: formData.name,
      plan: formData.plan as any,
      usage: { messages: 0, posts: 0, storage: 0 },
      limits: {
        messages: formData.plan === 'free' ? 1000 : formData.plan === 'pro' ? 50000 : 100000,
        posts: formData.plan === 'free' ? 50 : formData.plan === 'pro' ? 1000 : 5000,
        storage: formData.plan === 'free' ? 1 : formData.plan === 'pro' ? 10 : 50
      },
      is_active: true
    });
    
    setIsCreateOpen(false);
    setFormData({
      name: '',
      plan: 'free',
      admin_email: ''
    });
  };

  const impersonateTenant = (tenantId: string) => {
    // In a real app, this would switch the current user context
    console.log('Impersonating tenant:', tenantId);
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
            Tenant Management 🏢
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage all tenant organizations and their usage
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="neon-text">Create New Tenant</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Organization Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Acme Corp"
                    className="glass border-white/20"
                  />
                </div>
                <div>
                  <Label>Plan</Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value }))}
                  >
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/20">
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Admin Email</Label>
                <Input
                  value={formData.admin_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, admin_email: e.target.value }))}
                  placeholder="admin@acmecorp.com"
                  className="glass border-white/20"
                  type="email"
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTenant} className="btn-primary">
                  Create Tenant
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Tenant Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Tenants',
            value: tenants.length,
            change: '+12%',
            color: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Active Tenants',
            value: tenants.filter(t => t.is_active).length,
            change: '+8%',
            color: 'from-green-500 to-emerald-500'
          },
          {
            title: 'Enterprise Plans',
            value: tenants.filter(t => t.plan === 'enterprise').length,
            change: '+25%',
            color: 'from-yellow-500 to-orange-500'
          },
          {
            title: 'Total Revenue',
            value: '$48,690',
            change: '+18%',
            color: 'from-blue-500 to-cyan-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-green-400 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tenants List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tenants.map((tenant, index) => (
          <motion.div
            key={tenant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      tenant.plan === 'enterprise' ? 'from-yellow-500 to-orange-500' :
                      tenant.plan === 'pro' ? 'from-purple-500 to-pink-500' :
                      'from-gray-500 to-gray-600'
                    } flex items-center justify-center`}>
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tenant.name}</CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">
                        {tenant.plan} plan • Created {new Date(tenant.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    tenant.is_active ? 'status-active' : 'status-inactive'
                  }`}>
                    {tenant.is_active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Messages</div>
                    <div className="font-semibold">
                      {tenant.usage.messages.toLocaleString()} / {tenant.limits.messages.toLocaleString()}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-neon-purple h-2 rounded-full"
                        style={{ width: `${(tenant.usage.messages / tenant.limits.messages) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                    <div className="font-semibold">
                      {tenant.usage.posts} / {tenant.limits.posts}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-neon-green h-2 rounded-full"
                        style={{ width: `${(tenant.usage.posts / tenant.limits.posts) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Storage</div>
                    <div className="font-semibold">
                      {tenant.usage.storage}GB / {tenant.limits.storage}GB
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-neon-yellow h-2 rounded-full"
                        style={{ width: `${(tenant.usage.storage / tenant.limits.storage) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 glass border-white/20"
                    onClick={() => impersonateTenant(tenant.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20 hover:border-red-500"
                    onClick={() => deleteTenant(tenant.id)}
                  >
                    <Trash2 className="w-4 h-4" />
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

export default Tenants;
