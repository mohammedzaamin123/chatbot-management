
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  Bot,
  Target,
  Sparkles,
  Database,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useStore } from '../store/useStore';

const chartData = [
  { name: 'Mon', messages: 420, posts: 12, response: 1.2 },
  { name: 'Tue', messages: 680, posts: 18, response: 0.9 },
  { name: 'Wed', messages: 890, posts: 24, response: 1.1 },
  { name: 'Thu', messages: 560, posts: 15, response: 1.3 },
  { name: 'Fri', messages: 1240, posts: 32, response: 0.8 },
  { name: 'Sat', messages: 980, posts: 28, response: 1.0 },
  { name: 'Sun', messages: 760, posts: 21, response: 1.1 }
];

const pieData = [
  { name: 'WhatsApp', value: 35, color: '#10B981' },
  { name: 'Instagram', value: 25, color: '#EC4899' },
  { name: 'Facebook', value: 20, color: '#3B82F6' },
  { name: 'Telegram', value: 20, color: '#8B5CF6' }
];

export const Dashboard: React.FC = () => {
  const { analytics, chatbots, campaigns, currentTenant } = useStore();

  const quickActions = [
    { 
      icon: Bot, 
      label: 'Create Chatbot', 
      description: 'Build new AI assistant',
      color: 'from-purple-500 to-pink-500',
      path: '/chatbots'
    },
    { 
      icon: Sparkles, 
      label: 'Generate Content', 
      description: 'AI-powered content creation',
      color: 'from-yellow-500 to-orange-500',
      path: '/content'
    },
    { 
      icon: Calendar, 
      label: 'Schedule Post', 
      description: 'Plan your social media',
      color: 'from-green-500 to-cyan-500',
      path: '/scheduler'
    },
    { 
      icon: Target, 
      label: 'Launch Campaign', 
      description: 'Create marketing campaign',
      color: 'from-blue-500 to-purple-500',
      path: '/campaigns'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's what's happening with your AI-powered business today
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button className="btn-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" className="glass border-white/20">
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Users',
            value: analytics.activeUsers.toLocaleString(),
            change: '+23.5%',
            positive: true,
            icon: Users,
            color: 'neon-green'
          },
          {
            title: 'Total Messages',
            value: analytics.totalMessages.toLocaleString(),
            change: '+12.3%',
            positive: true,
            icon: MessageSquare,
            color: 'neon-purple'
          },
          {
            title: 'Posts Scheduled',
            value: analytics.totalPosts.toString(),
            change: '+8.7%',
            positive: true,
            icon: Calendar,
            color: 'neon-yellow'
          },
          {
            title: 'Response Time',
            value: `${analytics.responseTime}s`,
            change: '-15.2%',
            positive: true,
            icon: TrendingUp,
            color: 'neon-magenta'
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
                    <div className="flex items-center gap-1 mt-2">
                      {metric.positive ? (
                        <ArrowUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${metric.color}/20 to-${metric.color}/10 flex items-center justify-center`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card className="glass-strong border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Activity Overview</span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-xs">Day</Button>
                <Button size="sm" variant="ghost" className="text-xs bg-white/10">Week</Button>
                <Button size="sm" variant="ghost" className="text-xs">Month</Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="posts" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="glass-strong border-white/10">
          <CardHeader>
            <CardTitle>Message Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-strong border-white/10">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <div className={`p-6 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200`}>
                  <action.icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-1">{action.label}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Chatbots */}
        <Card className="glass-strong border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Active Chatbots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {chatbots.slice(0, 3).map((bot) => (
              <div key={bot.id} className="flex items-center justify-between p-3 glass rounded-lg">
                <div>
                  <div className="font-medium">{bot.name}</div>
                  <div className="text-sm text-muted-foreground">{bot.conversations} conversations</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  bot.status === 'active' ? 'status-active' : 
                  bot.status === 'inactive' ? 'status-inactive' : 'status-pending'
                }`}>
                  {bot.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Campaigns */}
        <Card className="glass-strong border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Recent Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {campaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 glass rounded-lg">
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-muted-foreground">ROI: {campaign.roi}%</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  campaign.status === 'active' ? 'status-active' : 
                  campaign.status === 'paused' ? 'status-pending' : 'status-active'
                }`}>
                  {campaign.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="glass-strong border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Response</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Optimal</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">AI Models</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Available</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-yellow-400">
                  {currentTenant ? Math.round((currentTenant.usage.storage / currentTenant.limits.storage) * 100) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Metric Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-24 left-6 glass-strong rounded-2xl p-4 shadow-neon border border-white/20"
      >
        <div className="text-center">
          <div className="text-2xl font-bold neon-text">+278K</div>
          <div className="text-sm text-muted-foreground">Active Users</div>
          <div className="text-xs text-green-400 flex items-center justify-center gap-1 mt-1">
            <ArrowUp className="w-3 h-3" />
            +23.5% this month
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
