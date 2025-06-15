
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

interface CollectionRecordsProps {
  collectionName: string;
  records: any[];
}

export const CollectionRecords: React.FC<CollectionRecordsProps> = ({ collectionName, records }) => {
  if (!records || records.length === 0)
    return <div className="text-sm text-muted-foreground mt-4">No data in this collection.</div>;

  const keys = Object.keys(records[0]);

  return (
    <div className="mt-2">
      <h5 className="font-semibold">{collectionName} Records</h5>
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            {keys.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((row, idx) => (
            <TableRow key={idx}>
              {keys.map((key) => (
                <TableCell key={key}>{row[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
