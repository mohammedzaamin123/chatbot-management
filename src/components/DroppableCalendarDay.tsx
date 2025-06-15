
import React from 'react';
import { useDrop } from 'react-dnd';
import { format } from 'date-fns';
import { DraggablePost } from './DraggablePost';

interface Post {
  id: string;
  content: string;
  platforms: string[];
  scheduled_at: string;
  status: string;
}

interface DroppableCalendarDayProps {
  date: Date;
  posts: Post[];
  onDropPost: (postId: string, newDate: Date) => void;
  onDropDraftPost?: (draftId: string, newDate: Date, time?: string) => void;
  isToday?: boolean;
}

export const DroppableCalendarDay: React.FC<DroppableCalendarDayProps> = ({
  date,
  posts,
  onDropPost,
  onDropDraftPost,
  isToday = false
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['post', 'draft'],
    drop: (item: { id: string; post?: Post; draft?: any; type?: string }) => {
      if (item.post) {
        onDropPost(item.id, date);
      } else if (item.draft && onDropDraftPost) {
        onDropDraftPost(item.id, date, '12:00');
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[120px] p-2 rounded-lg transition-colors ${
        isOver ? 'bg-neon-purple/20' : 'glass'
      } ${isToday ? 'ring-2 ring-neon-purple' : ''}`}
    >
      <div className="text-center mb-2">
        <div className="text-sm text-muted-foreground">
          {format(date, 'EEE')}
        </div>
        <div className={`text-lg font-semibold ${isToday ? 'text-neon-purple' : ''}`}>
          {format(date, 'd')}
        </div>
      </div>
      
      <div className="space-y-2">
        {posts.map((post) => (
          <DraggablePost key={post.id} post={post} />
        ))}
      </div>
      
      {isOver && (
        <div className="mt-2 p-2 border-2 border-dashed border-neon-purple rounded-lg text-center text-xs text-neon-purple">
          Drop post here
        </div>
      )}
    </div>
  );
};
