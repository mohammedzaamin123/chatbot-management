
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from './ui/button';
import { MoreHorizontal, Eye } from 'lucide-react';
import { CollectionRecordsPopup } from './CollectionRecordsPopup';

interface CollectionRecordsProps {
  collectionName: string;
  records: any[];
}

export const CollectionRecords: React.FC<CollectionRecordsProps> = ({ collectionName, records }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!records || records.length === 0)
    return <div className="text-sm text-muted-foreground py-4 text-center">No data in this collection.</div>;

  const keys = Object.keys(records[0]);
  const displayRecords = records.slice(0, 3); // Show only first 3 records
  const hasMoreRecords = records.length > 3;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          {collectionName} Records
        </h5>
        {hasMoreRecords && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPopupOpen(true)}
            className="glass border-border/50 hover:bg-accent"
          >
            <Eye className="w-4 h-4 mr-2" />
            View All ({records.length})
          </Button>
        )}
      </div>
      
      <div className="rounded-lg border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {keys.map((key) => (
                <TableHead key={key} className="font-semibold text-foreground">{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayRecords.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-muted/30">
                {keys.map((key) => (
                  <TableCell key={key} className="font-medium">
                    {typeof row[key] === 'string' && row[key].includes('@') ? (
                      <span className="text-primary">{row[key]}</span>
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            
            {hasMoreRecords && (
              <TableRow>
                <TableCell colSpan={keys.length} className="text-center py-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsPopupOpen(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="w-4 h-4 mr-2" />
                    {records.length - 3} more records... Click to view all
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CollectionRecordsPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        collectionName={collectionName}
        records={records}
      />
    </div>
  );
};
