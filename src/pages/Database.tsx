
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database as DatabaseIcon, Plus, Settings, Trash2, RefreshCw, Eye, Edit } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useStore, DatabaseConnection } from '../store/useStore';
import { toast } from '@/hooks/use-toast';
import { DatabaseDetailsDialog } from '../components/DatabaseDetailsDialog';

export const Database: React.FC = () => {
  const { databases, addDatabase, updateDatabase, deleteDatabase } = useStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<DatabaseConnection | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'postgresql',
    connection_string: ''
  });

  const handleCreateDatabase = () => {
    addDatabase({
      name: formData.name,
      type: formData.type as any,
      status: 'connected',
      collections: ['users', 'products'],
      last_sync: new Date().toISOString()
    });
    
    setIsCreateOpen(false);
    setFormData({
      name: '',
      type: 'postgresql',
      connection_string: ''
    });
  };

  const handleDatabaseClick = (database: DatabaseConnection) => {
    setSelectedDatabase(database);
    setIsDetailsOpen(true);
  };

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
    <div className="space-y-8 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            Database Manager 
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <DatabaseIcon className="w-6 h-6 text-white" />
            </div>
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect and manage your databases
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Database
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle>Connect Database</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Database Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Customer Database"
                    className="glass border-white/20"
                  />
                </div>
                <div>
                  <Label>Database Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/20">
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="airtable">Airtable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Connection String</Label>
                <Input
                  value={formData.connection_string}
                  onChange={(e) => setFormData(prev => ({ ...prev, connection_string: e.target.value }))}
                  placeholder="postgresql://user:password@host:port/database"
                  className="glass border-white/20"
                  type="password"
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDatabase} className="btn-primary">
                  Connect Database
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Database Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {databases.map((db, index) => (
          <motion.div
            key={db.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
          >
            <Card
              className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl transition-all duration-300 hover:border-border cursor-pointer hover:shadow-lg"
              onClick={() => handleDatabaseClick(db)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(db.status)} flex items-center justify-center shadow-lg`}>
                      <DatabaseIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">{db.name}</CardTitle>
                      <p className="text-sm text-muted-foreground uppercase font-medium">{db.type}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(db.status)}`}>
                    {db.status}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground mb-3">Collections/Tables</div>
                  <div className="flex flex-wrap gap-2">
                    {db.collections.map((collection) => (
                      <span 
                        key={collection} 
                        className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium border border-primary/20"
                      >
                        {collection}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Last sync:</span> {new Date(db.last_sync).toLocaleString()}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDatabaseClick(db);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {/* Add New Database Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: databases.length * 0.1 }}
          className="w-full"
        >
          <Card 
            className="bg-card/30 backdrop-blur-xl border-2 border-dashed border-border/50 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-card/50 transition-all duration-300 h-full min-h-[200px]"
            onClick={() => setIsCreateOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4 shadow-lg">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Connect Database</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Add a new database connection to power your AI applications
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <DatabaseDetailsDialog
        database={selectedDatabase}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedDatabase(null);
        }}
        onDelete={deleteDatabase}
      />
    </div>
  );
};

export default Database;
