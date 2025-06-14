
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Plus, Play, Pause, Settings, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

export const Automation: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const automations = [
    {
      id: 1,
      name: 'Welcome Message Flow',
      status: 'active',
      triggers: 2,
      actions: 5,
      executions: 1247
    },
    {
      id: 2,
      name: 'Lead Qualification Bot',
      status: 'active',
      triggers: 3,
      actions: 8,
      executions: 892
    },
    {
      id: 3,
      name: 'Social Media Auto-Reply',
      status: 'paused',
      triggers: 1,
      actions: 3,
      executions: 234
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">
            Automation Flows ⚡
          </h1>
          <p className="text-lg text-muted-foreground">
            Create powerful automation workflows for your business
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Flow
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/20 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="neon-text">Visual Flow Builder</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Visual Flow Builder Placeholder */}
              <div className="h-96 glass rounded-lg border-white/20 border-2 border-dashed flex items-center justify-center">
                <div className="text-center">
                  <Workflow className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Visual Flow Builder</h3>
                  <p className="text-muted-foreground">Drag and drop to create automation flows</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Automation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      automation.status === 'active' ? 'from-green-500 to-emerald-500' : 'from-gray-500 to-gray-600'
                    } flex items-center justify-center`}>
                      <Workflow className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{automation.name}</CardTitle>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    automation.status === 'active' ? 'status-active' : 'status-inactive'
                  }`}>
                    {automation.status}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Triggers</div>
                    <div className="font-semibold">{automation.triggers}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Actions</div>
                    <div className="font-semibold">{automation.actions}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Runs</div>
                    <div className="font-semibold">{automation.executions}</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 glass border-white/20">
                    {automation.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {/* Create New Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: automations.length * 0.1 }}
        >
          <Card 
            className="metric-card h-full border-dashed border-2 border-white/20 cursor-pointer hover:border-neon-purple"
            onClick={() => setIsCreateOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-16 h-16 rounded-xl glass flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Create New Flow</h3>
              <p className="text-sm text-muted-foreground text-center">
                Build automated workflows to streamline your processes
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Flow Templates */}
      <Card className="glass-strong border-white/10">
        <CardHeader>
          <CardTitle>Flow Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Welcome Series',
                description: 'Automated welcome message sequence for new subscribers',
                icon: '👋',
                category: 'Marketing'
              },
              {
                name: 'Lead Scoring',
                description: 'Score and qualify leads based on interactions',
                icon: '🎯',
                category: 'Sales'
              },
              {
                name: 'Support Tickets',
                description: 'Auto-route support requests to appropriate teams',
                icon: '🎫',
                category: 'Support'
              },
              {
                name: 'Social Monitoring',
                description: 'Monitor mentions and auto-respond to engagement',
                icon: '📱',
                category: 'Social'
              },
              {
                name: 'Content Publishing',
                description: 'Automatically publish content across platforms',
                icon: '📝',
                category: 'Content'
              },
              {
                name: 'Data Sync',
                description: 'Keep databases synchronized across systems',
                icon: '🔄',
                category: 'Integration'
              }
            ].map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass border-white/10 hover:bg-white/5 cursor-pointer transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{template.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{template.name}</div>
                        <div className="text-xs text-muted-foreground mb-2">{template.description}</div>
                        <div className="text-xs text-neon-purple">{template.category}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Automation;
