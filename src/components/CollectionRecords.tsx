
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

interface CollectionRecordsProps {
  collectionName: string;
  records: any[];
}

export const CollectionRecords: React.FC<CollectionRecordsProps> = ({ collectionName, records }) => {
  if (!records || records.length === 0)
    return <div className="text-sm text-muted-foreground py-4 text-center">No data in this collection.</div>;

  const keys = Object.keys(records[0]);

  return (
    <div className="space-y-3">
      <h5 className="font-semibold text-foreground flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        {collectionName} Records
      </h5>
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
            {records.map((row, idx) => (
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
