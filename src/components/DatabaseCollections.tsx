
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
    <div className="mt-2 bg-apple-gray-50 rounded p-4">
      <h4 className="font-semibold mb-2">Collections</h4>
      <div className="flex flex-wrap gap-2 mb-2">
        {database.collections.map((collection) => (
          <Button
            variant={selectedCollection === collection ? 'default' : 'outline'}
            size="sm"
            key={collection}
            className=""
            onClick={() => setSelectedCollection(collection)}
          >
            {collection}
          </Button>
        ))}
      </div>

      {selectedCollection && (
        <CollectionRecords
          collectionName={selectedCollection}
          records={SAMPLE_COLLECTION_DATA[selectedCollection] || []}
        />
      )}
    </div>
  );
};
