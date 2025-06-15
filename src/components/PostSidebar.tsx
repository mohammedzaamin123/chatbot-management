
import React from 'react';
import { Plus, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { DraggableDraftPost } from './DraggableDraftPost';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

interface PostSidebarProps {
  onDropDraftPost: (draftId: string, newDate: Date, time?: string) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
  formData: {
    content: string;
    platforms: string[];
    scheduled_at: string;
    media: string[];
  };
  setFormData: (data: any) => void;
  handleCreatePost: () => void;
  platforms: Array<{
    id: string;
    name: string;
    icon: any;
    color: string;
  }>;
}

export const PostSidebar: React.FC<PostSidebarProps> = ({
  onDropDraftPost,
  isCreateOpen,
  setIsCreateOpen,
  formData,
  setFormData,
  handleCreatePost,
  platforms
}) => {
  const { draftPosts } = useStore();

  return (
    <div className="w-80 space-y-6">
      {/* Create Post Button */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogTrigger asChild>
          <Button className="w-full btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-strong border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="neon-text">Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="What's on your mind?"
                className="glass border-white/20 h-24"
              />
            </div>
            
            <div>
              <Label>Platforms</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant="outline"
                    className={`glass border-white/20 justify-start ${
                      formData.platforms.includes(platform.id) ? 'bg-neon-purple' : ''
                    }`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        platforms: prev.platforms.includes(platform.id)
                          ? prev.platforms.filter(p => p !== platform.id)
                          : [...prev.platforms, platform.id]
                      }));
                    }}
                  >
                    <platform.icon className={`w-4 h-4 mr-2 ${platform.color}`} />
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date (Optional)</Label>
                <Input
                  type="date"
                  value={formData.scheduled_at.split('T')[0] || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    scheduled_at: e.target.value ? e.target.value + 'T' + (prev.scheduled_at.split('T')[1] || '12:00') : ''
                  }))}
                  className="glass border-white/20"
                />
              </div>
              <div>
                <Label>Time (Optional)</Label>
                <Input
                  type="time"
                  value={formData.scheduled_at.split('T')[1] || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    scheduled_at: (prev.scheduled_at.split('T')[0] || format(new Date(), 'yyyy-MM-dd')) + 'T' + e.target.value
                  }))}
                  className="glass border-white/20"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost} className="btn-primary">
                {formData.scheduled_at ? 'Schedule Post' : 'Create Draft'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Draft Posts */}
      <Card className="glass-strong border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">Draft Posts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Drag posts to calendar to schedule them
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {draftPosts && draftPosts.length > 0 ? (
              draftPosts.map((draft) => (
                <DraggableDraftPost key={draft.id} draft={draft} />
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm">No draft posts yet</p>
                <p className="text-xs mt-1">Create a post without scheduling to add drafts</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
