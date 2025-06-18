
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CollectionRecordsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  collectionName: string;
  records: any[];
}

export const CollectionRecordsPopup: React.FC<CollectionRecordsPopupProps> = ({
  isOpen,
  onClose,
  collectionName,
  records
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  if (!records || records.length === 0) return null;

  const keys = Object.keys(records[0]);

  // Filter and search logic
  const filteredRecords = useMemo(() => {
    let filtered = records;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(record =>
        Object.values(record).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filter
    if (filterColumn && filterValue) {
      filtered = filtered.filter(record =>
        String(record[filterColumn]).toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [records, searchTerm, filterColumn, filterValue]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterColumn('');
    setFilterValue('');
    setCurrentPage(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/20 max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            {collectionName} Collection ({filteredRecords.length} records)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card/30 rounded-lg border border-border/50">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search all fields..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 glass border-border/50"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select
                value={filterColumn}
                onValueChange={(value) => {
                  setFilterColumn(value);
                  setFilterValue('');
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[160px] glass border-border/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent className="glass border-border/50 bg-popover z-50">
                  {keys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {filterColumn && (
                <Input
                  placeholder={`Filter ${filterColumn}...`}
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-[200px] glass border-border/50"
                />
              )}

              {(searchTerm || filterColumn || filterValue) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="glass border-border/50"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border/50 overflow-hidden bg-card/50">
            <div className="max-h-[60vh] overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
                  <TableRow>
                    {keys.map((key) => (
                      <TableHead key={key} className="font-semibold text-foreground border-r border-border/30 last:border-r-0">
                        {key}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.map((row, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/30 border-b border-border/30">
                      {keys.map((key) => (
                        <TableCell key={key} className="font-medium border-r border-border/20 last:border-r-0">
                          {typeof row[key] === 'string' && row[key].includes('@') ? (
                            <span className="text-primary">{row[key]}</span>
                          ) : (
                            <span className="break-words">{String(row[key])}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 bg-card/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRecords.length)} of {filteredRecords.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="glass border-border/50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <span className="text-sm font-medium px-3">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="glass border-border/50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No records found matching your criteria.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-2 glass border-border/50"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
