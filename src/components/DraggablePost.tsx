
import React from 'react';
import { useDrag } from 'react-dnd';
import { format } from 'date-fns';
import { Clock, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' }
];

interface Post {
  id: string;
  content: string;
  platforms: string[];
  scheduled_at: string;
  status: string;
}

interface DraggablePostProps {
  post: Post;
}

export const DraggablePost: React.FC<DraggablePostProps> = ({ post }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'post',
    item: { id: post.id, post },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-neon-gradient p-3 rounded-lg text-sm cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-1 mb-2">
        <Clock className="w-3 h-3" />
        <span className="text-xs">
          {format(new Date(post.scheduled_at), 'HH:mm')}
        </span>
      </div>
      <div className="text-xs mb-2 line-clamp-2">
        {post.content}
      </div>
      <div className="flex gap-1">
        {post.platforms.map((platform) => {
          const Platform = PLATFORMS.find(p => p.id === platform);
          return Platform ? (
            <Platform.icon key={platform} className="w-3 h-3" />
          ) : null;
        })}
      </div>
    </div>
  );
};
