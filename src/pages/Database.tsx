
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
import { useStore } from '../store/useStore';

export const Database: React.FC = () => {
  const { databases, addDatabase, updateDatabase, deleteDatabase } = useStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
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

  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', created: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', created: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', created: '2024-01-13' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">
            Database Manager 🗄️
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
              <DialogTitle className="neon-text">Connect Database</DialogTitle>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {databases.map((db, index) => (
          <motion.div
            key={db.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="metric-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      db.status === 'connected' ? 'from-green-500 to-emerald-500' : 
                      db.status === 'error' ? 'from-red-500 to-red-600' : 'from-gray-500 to-gray-600'
                    } flex items-center justify-center`}>
                      <DatabaseIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{db.name}</CardTitle>
                      <p className="text-sm text-muted-foreground uppercase">{db.type}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    db.status === 'connected' ? 'status-active' : 
                    db.status === 'error' ? 'status-inactive' : 'status-pending'
                  }`}>
                    {db.status}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Collections/Tables</div>
                  <div className="flex flex-wrap gap-1">
                    {db.collections.map((collection) => (
                      <span key={collection} className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded text-xs">
                        {collection}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last sync: {new Date(db.last_sync).toLocaleString()}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 glass border-white/20"
                    onClick={() => setSelectedDatabase(db)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20 hover:border-red-500"
                    onClick={() => deleteDatabase(db.id)}
                  >
                    <Trash2 className="w-4 h-4" />
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
        >
          <Card 
            className="metric-card h-full border-dashed border-2 border-white/20 cursor-pointer hover:border-neon-purple"
            onClick={() => setIsCreateOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-16 h-16 rounded-xl glass flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Connect Database</h3>
              <p className="text-sm text-muted-foreground text-center">
                Add a new database connection to power your AI applications
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Database Viewer */}
      {selectedDatabase && (
        <Card className="glass-strong border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Database: {selectedDatabase.name}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="glass border-white/20">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Data
                </Button>
                <Button size="sm" variant="outline" className="glass border-white/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Record
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        row.status === 'active' ? 'status-active' : 'status-inactive'
                      }`}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell>{row.created}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="glass border-white/20">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass border-white/20 hover:border-red-500">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Database;
