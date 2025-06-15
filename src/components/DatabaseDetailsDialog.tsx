
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { DatabaseConnection } from '../store/useStore';
import { DatabaseCollections } from './DatabaseCollections';
import { Database as DatabaseIcon, RefreshCw, Settings, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

interface DatabaseDetailsDialogProps {
  database: DatabaseConnection | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const DatabaseDetailsDialog: React.FC<DatabaseDetailsDialogProps> = ({
  database,
  isOpen,
  onClose,
  onDelete
}) => {
  if (!database) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'from-green-500 to-emerald-500';
      case 'error':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(database.status)} flex items-center justify-center shadow-lg`}>
                <DatabaseIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-semibold">{database.name}</DialogTitle>
                <p className="text-sm text-muted-foreground uppercase font-medium">{database.type}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(database.status)}`}>
              {database.status}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Last sync:</span> {new Date(database.last_sync).toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                onClick={() => {
                  toast({ title: 'Synced!', description: `Database "${database.name}" refreshed.` });
                }}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-card border-border/50 hover:bg-accent"
                onClick={() => {
                  toast({ title: 'Info', description: 'Settings page coming soon.' });
                }}
              >
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-card border-border/50 hover:bg-destructive/10 hover:border-destructive/20 hover:text-destructive"
                onClick={() => {
                  onDelete(database.id);
                  onClose();
                  toast({ title: 'Deleted', description: `Database "${database.name}" deleted.` });
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>

          <DatabaseCollections database={database} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
