
import React from 'react';
import { useDrag } from 'react-dnd';
import { Instagram, Facebook, Twitter, Linkedin, GripVertical } from 'lucide-react';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' }
];

interface DraftPost {
  id: string;
  content: string;
  platforms: string[];
  media?: string[];
}

interface DraggableDraftPostProps {
  draft: DraftPost;
}

export const DraggableDraftPost: React.FC<DraggableDraftPostProps> = ({ draft }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'draft',
    item: { id: draft.id, draft },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg border border-white/10 cursor-move transition-opacity hover:border-white/20 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm mb-2 line-clamp-3">
            {draft.content}
          </div>
          <div className="flex gap-1">
            {draft.platforms.map((platform) => {
              const Platform = PLATFORMS.find(p => p.id === platform);
              return Platform ? (
                <Platform.icon key={platform} className={`w-3 h-3 ${Platform.color}`} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
