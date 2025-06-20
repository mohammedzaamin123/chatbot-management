
import React from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, Users, MessageSquare, Calendar } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface AnalyticsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsPopup: React.FC<AnalyticsPopupProps> = ({ isOpen, onClose }) => {
  const { analytics } = useStore();

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Detailed Analytics"
      description="Comprehensive view of your business metrics"
      size="xl"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="glass border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-jakarta">{analytics.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-green-500 mt-1">+23.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-jakarta">{analytics.totalMessages.toLocaleString()}</div>
              <p className="text-xs text-green-500 mt-1">+12.3% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-jakarta">{analytics.totalPosts}</div>
              <p className="text-xs text-green-500 mt-1">+8.7% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pink-500" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-jakarta">{analytics.responseTime}s</div>
              <p className="text-xs text-green-500 mt-1">-15.2% improvement</p>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold mb-2 font-jakarta">Performance Insights</h3>
          <div className="space-y-2 text-sm font-inter">
            <p>• Peak activity occurs between 2-4 PM daily</p>
            <p>• WhatsApp generates 35% of total engagement</p>
            <p>• AI response accuracy improved by 18% this month</p>
            <p>• Content scheduling efficiency up 25%</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button className="btn-primary">
          Export Report
        </Button>
      </div>
    </Popup>
  );
};
