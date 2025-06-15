import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Plus, Instagram, Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { useStore } from '../store/useStore';
import { format, addDays, startOfWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { DroppableCalendarDay } from '../components/DroppableCalendarDay';
import { PostSidebar } from '../components/PostSidebar';
import { useToast } from '../hooks/use-toast';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' }
];

export const Scheduler: React.FC = () => {
  const { scheduledPosts, addScheduledPost, updateScheduledPost, draftPosts, addDraftPost } = useStore();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  const [formData, setFormData] = useState({
    content: '',
    platforms: [] as string[],
    scheduled_at: '',
    media: [] as string[]
  });

  const handleCreatePost = () => {
    if (!formData.content || formData.platforms.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in content and select platforms."
      });
      return;
    }

    // If no date/time is set, create as draft
    if (!formData.scheduled_at) {
      addDraftPost({
        content: formData.content,
        platforms: formData.platforms as ('instagram' | 'facebook' | 'twitter' | 'linkedin')[],
        media: formData.media
      });
      
      toast({
        title: "Draft Created",
        description: "Your post draft has been created. Drag it to a calendar day to schedule!"
      });
    } else {
      addScheduledPost({
        content: formData.content,
        platforms: formData.platforms as ('instagram' | 'facebook' | 'twitter' | 'linkedin')[],
        scheduled_at: formData.scheduled_at,
        status: 'scheduled',
        media: formData.media
      });
      
      toast({
        title: "Post Scheduled",
        description: "Your post has been scheduled successfully!"
      });
    }
    
    setIsCreateOpen(false);
    setFormData({
      content: '',
      platforms: [],
      scheduled_at: '',
      media: []
    });
  };

  const handleDropPost = (postId: string, newDate: Date) => {
    const post = scheduledPosts.find(p => p.id === postId);
    if (post) {
      const currentTime = format(new Date(post.scheduled_at), 'HH:mm');
      const newDateTime = format(newDate, 'yyyy-MM-dd') + 'T' + currentTime;
      
      updateScheduledPost(postId, {
        scheduled_at: newDateTime
      });
      
      toast({
        title: "Post Moved",
        description: `Post moved to ${format(newDate, 'MMM d, yyyy')}`
      });
    }
  };

  const handleDropDraftPost = (draftId: string, newDate: Date, time: string = '12:00') => {
    const draft = draftPosts?.find(p => p.id === draftId);
    if (draft) {
      const newDateTime = format(newDate, 'yyyy-MM-dd') + 'T' + time;
      
      addScheduledPost({
        content: draft.content,
        platforms: draft.platforms,
        scheduled_at: newDateTime,
        status: 'scheduled',
        media: draft.media || []
      });
      
      toast({
        title: "Draft Scheduled",
        description: `Post scheduled for ${format(newDate, 'MMM d, yyyy')} at ${time}`
      });
    }
  };

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      format(new Date(post.scheduled_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getCalendarDays = () => {
    if (viewMode === 'week') {
      return Array.from({ length: 7 }, (_, i) => 
        addDays(startOfWeek(selectedDate), i)
      );
    } else {
      const start = startOfMonth(selectedDate);
      const end = endOfMonth(selectedDate);
      return eachDayOfInterval({ start, end });
    }
  };

  const navigateCalendar = (direction: 'prev' | 'next') => {
    if (viewMode === 'week') {
      setSelectedDate(prev => direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1));
    } else {
      setSelectedDate(prev => direction === 'next' ? addDays(prev, 32) : addDays(prev, -32));
    }
  };

  const calendarDays = getCalendarDays();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-6 h-full">
        {/* Sidebar with posts */}
        <PostSidebar 
          onDropDraftPost={handleDropDraftPost}
          isCreateOpen={isCreateOpen}
          setIsCreateOpen={setIsCreateOpen}
          formData={formData}
          setFormData={setFormData}
          handleCreatePost={handleCreatePost}
          platforms={PLATFORMS}
        />

        {/* Main content */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl font-bold neon-text mb-2">
                Post Scheduler 📅
              </h1>
              <p className="text-lg text-muted-foreground">
                Plan and schedule your social media content with drag & drop
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex rounded-lg glass overflow-hidden">
                <Button
                  variant={viewMode === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                  className="rounded-none"
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className="rounded-none"
                >
                  Month
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Full Calendar View */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  {viewMode === 'week' ? 'Weekly Schedule' : 'Monthly Schedule'}
                  <span className="text-sm font-normal text-muted-foreground">
                    {format(selectedDate, 'MMMM yyyy')}
                  </span>
                </span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20"
                    onClick={() => navigateCalendar('prev')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20"
                    onClick={() => navigateCalendar('next')}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`grid gap-4 ${
                viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7'
              }`}>
                {calendarDays.map((day, index) => {
                  const dayPosts = getPostsForDate(day);
                  return (
                    <motion.div
                      key={day.toISOString()}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <DroppableCalendarDay 
                        date={day}
                        posts={dayPosts}
                        onDropPost={handleDropPost}
                        onDropDraftPost={handleDropDraftPost}
                        isToday={isToday(day)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card className="glass-strong border-white/10">
            <CardHeader>
              <CardTitle>Upcoming Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.slice(0, 5).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 glass rounded-lg"
                  >
                    <div className="flex gap-2">
                      {post.platforms.map((platform) => {
                        const Platform = PLATFORMS.find(p => p.id === platform);
                        return Platform ? (
                          <div key={platform} className={`w-8 h-8 rounded-lg glass flex items-center justify-center`}>
                            <Platform.icon className={`w-4 h-4 ${Platform.color}`} />
                          </div>
                        ) : null;
                      })}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium">{post.content.substring(0, 60)}...</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(post.scheduled_at), 'MMM d, yyyy • h:mm a')}
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'scheduled' ? 'status-pending' : 
                      post.status === 'published' ? 'status-active' : 'status-inactive'
                    }`}>
                      {post.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};

export default Scheduler;
