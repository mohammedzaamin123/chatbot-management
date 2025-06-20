
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Bot, Sparkles, Calendar, Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickActionPopup: React.FC<QuickActionPopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = [
    {
      id: 'chatbot',
      icon: Bot,
      title: 'Create AI Chatbot',
      description: 'Build an intelligent chatbot for customer support',
      color: 'from-purple-500 to-pink-500',
      path: '/chatbots',
      features: ['Natural language processing', 'Multi-platform support', 'Custom training']
    },
    {
      id: 'content',
      icon: Sparkles,
      title: 'Generate Content',
      description: 'AI-powered content creation for social media',
      color: 'from-yellow-500 to-orange-500',
      path: '/content',
      features: ['Auto-generated posts', 'Brand voice matching', 'Multi-format support']
    },
    {
      id: 'scheduler',
      icon: Calendar,
      title: 'Schedule Posts',
      description: 'Plan and automate your social media presence',
      color: 'from-green-500 to-cyan-500',
      path: '/scheduler',
      features: ['Multi-platform scheduling', 'Optimal timing', 'Content calendar']
    },
    {
      id: 'campaign',
      icon: Target,
      title: 'Launch Campaign',
      description: 'Create targeted marketing campaigns',
      color: 'from-blue-500 to-purple-500',
      path: '/campaigns',
      features: ['Audience targeting', 'Performance tracking', 'A/B testing']
    }
  ];

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(selectedAction === actionId ? null : actionId);
  };

  const handleProceed = () => {
    if (selectedAction) {
      const action = actions.find(a => a.id === selectedAction);
      if (action) {
        navigate(action.path);
        onClose();
      }
    }
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Actions"
      description="Choose an action to get started with AI-powered tools"
      size="lg"
    >
      <div className="space-y-4">
        {actions.map((action) => {
          const isSelected = selectedAction === action.id;
          return (
            <Card
              key={action.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                isSelected
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'glass border-white/20 hover:shadow-lg'
              }`}
              onClick={() => handleActionSelect(action.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold font-jakarta mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground font-inter mb-2">
                      {action.description}
                    </p>
                    
                    {isSelected && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground font-inter">
                          Key Features:
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1 font-inter">
                          {action.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className={`transition-transform duration-200 ${
                    isSelected ? 'rotate-90' : ''
                  }`}>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          className="btn-primary"
          onClick={handleProceed}
          disabled={!selectedAction}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Popup>
  );
};
