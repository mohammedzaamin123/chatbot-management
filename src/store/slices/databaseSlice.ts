
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatabaseConnection } from '../types';

interface DatabaseState {
  databases: DatabaseConnection[];
}

const initialState: DatabaseState = {
  databases: [
    {
      id: '1',
      name: 'Customer Database',
      type: 'postgresql',
      status: 'connected',
      collections: ['users', 'orders', 'products'],
      last_sync: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Analytics DB',
      type: 'mongodb',
      status: 'connected',
      collections: ['events', 'sessions'],
      last_sync: new Date().toISOString(),
    },
  ],
};

const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    addDatabase: (state, action: PayloadAction<Omit<DatabaseConnection, 'id'>>) => {
      const newDatabase: DatabaseConnection = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.databases.push(newDatabase);
    },
    updateDatabase: (state, action: PayloadAction<{ id: string; updates: Partial<DatabaseConnection> }>) => {
      const { id, updates } = action.payload;
      const dbIndex = state.databases.findIndex(db => db.id === id);
      if (dbIndex !== -1) {
        state.databases[dbIndex] = { ...state.databases[dbIndex], ...updates };
      }
    },
    deleteDatabase: (state, action: PayloadAction<string>) => {
      state.databases = state.databases.filter(db => db.id !== action.payload);
    },
  },
});

export const { addDatabase, updateDatabase, deleteDatabase } = databaseSlice.actions;
export default databaseSlice.reducer;
