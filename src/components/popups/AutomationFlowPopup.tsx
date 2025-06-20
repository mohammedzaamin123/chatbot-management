
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Workflow, Plus, ArrowRight, Play } from 'lucide-react';

interface AutomationFlowPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutomationFlowPopup: React.FC<AutomationFlowPopupProps> = ({
  isOpen,
  onClose
}) => {
  const [flowData, setFlowData] = useState({
    name: '',
    trigger: 'message_received',
    conditions: [] as string[],
    actions: [] as string[]
  });

  const triggerOptions = [
    { value: 'message_received', label: 'Message Received' },
    { value: 'keyword_mentioned', label: 'Keyword Mentioned' },
    { value: 'user_joined', label: 'User Joined' },
    { value: 'scheduled_time', label: 'Scheduled Time' },
    { value: 'form_submitted', label: 'Form Submitted' }
  ];

  const actionOptions = [
    { value: 'send_message', label: 'Send Message' },
    { value: 'assign_agent', label: 'Assign to Agent' },
    { value: 'add_tag', label: 'Add Tag' },
    { value: 'create_ticket', label: 'Create Support Ticket' },
    { value: 'send_email', label: 'Send Email' }
  ];

  const handleSaveFlow = () => {
    console.log('Saving automation flow:', flowData);
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Create Automation Flow"
      description="Build automated workflows to handle customer interactions"
      size="xl"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="flow-name">Flow Name</Label>
          <Input
            id="flow-name"
            value={flowData.name}
            onChange={(e) => setFlowData({ ...flowData, name: e.target.value })}
            placeholder="Enter flow name"
          />
        </div>

        {/* Flow Builder */}
        <div className="space-y-4">
          <h3 className="font-semibold font-jakarta">Flow Configuration</h3>
          
          {/* Trigger */}
          <Card className="glass border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-green-500" />
                Trigger
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={flowData.trigger}
                onValueChange={(value) => setFlowData({ ...flowData, trigger: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {triggerOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Conditions */}
          <Card className="glass border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Workflow className="w-4 h-4 text-blue-500" />
                Conditions (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Field</Label>
                  <Select>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="platform">Platform</SelectItem>
                      <SelectItem value="message_content">Message Content</SelectItem>
                      <SelectItem value="user_type">User Type</SelectItem>
                      <SelectItem value="time_of_day">Time of Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Value</Label>
                  <Input className="h-8" placeholder="Enter value" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-3 h-3 mr-1" />
                Add Condition
              </Button>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Actions */}
          <Card className="glass border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-purple-500" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  {actionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Textarea
                placeholder="Action configuration (e.g., message template, email content)"
                rows={3}
                className="text-sm"
              />
              
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-3 h-3 mr-1" />
                Add Action
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveFlow} className="btn-primary">
            <Workflow className="w-4 h-4 mr-2" />
            Save Flow
          </Button>
        </div>
      </div>
    </Popup>
  );
};
