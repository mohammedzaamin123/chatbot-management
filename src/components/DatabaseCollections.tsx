
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { DatabaseConnection } from '../store/useStore';
import { CollectionRecords } from './CollectionRecords';

interface Props {
  database: DatabaseConnection;
}

const SAMPLE_COLLECTION_DATA: Record<string, any[]> = {
  users: [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'active', created: '2024-03-01' },
    { id: 2, name: 'Bob Lee', email: 'bob@example.com', status: 'inactive', created: '2024-01-25' }
  ],
  products: [
    { id: 1, name: 'T-Shirt', price: '$20', stock: 50 },
    { id: 2, name: 'Sneakers', price: '$65', stock: 10 }
  ],
  orders: [
    { id: 1, user: 'Alice', product: 'T-Shirt', status: 'delivered' },
    { id: 2, user: 'Bob', product: 'Sneakers', status: 'pending' }
  ],
  support_tickets: [
    { id: 1, subject: 'Login issue', status: 'open' }
  ],
  inventory: [
    { id: 1, sku: 'A123', stock: 15 }
  ],
  categories: [
    { id: 1, name: 'Apparel' }
  ]
};

export const DatabaseCollections: React.FC<Props> = ({ database }) => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">Collections</h4>
      <div className="flex flex-wrap gap-2">
        {database.collections.map((collection) => (
          <Button
            variant={selectedCollection === collection ? 'default' : 'outline'}
            size="sm"
            key={collection}
            className={`rounded-lg ${
              selectedCollection === collection 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card/50 border-border/50 hover:bg-accent'
            }`}
            onClick={() => setSelectedCollection(selectedCollection === collection ? null : collection)}
          >
            {collection}
          </Button>
        ))}
      </div>

      {selectedCollection && (
        <div className="bg-card/30 rounded-xl p-4 border border-border/50">
          <CollectionRecords
            collectionName={selectedCollection}
            records={SAMPLE_COLLECTION_DATA[selectedCollection] || []}
          />
        </div>
      )}
    </div>
  );
};
