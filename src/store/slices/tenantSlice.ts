
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tenant } from '../types';

interface TenantState {
  tenants: Tenant[];
  currentTenant: Tenant | null;
}

const initialState: TenantState = {
  tenants: [
    {
      id: '1',
      name: 'ChronoSync AI',
      plan: 'enterprise',
      usage: { messages: 15420, posts: 245, storage: 12.5 },
      limits: { messages: 100000, posts: 5000, storage: 50 },
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Demo Company',
      plan: 'pro',
      usage: { messages: 2840, posts: 89, storage: 3.2 },
      limits: { messages: 50000, posts: 1000, storage: 10 },
      is_active: true,
      created_at: new Date().toISOString(),
    },
  ],
  currentTenant: {
    id: '1',
    name: 'ChronoSync AI',
    plan: 'enterprise',
    usage: { messages: 15420, posts: 245, storage: 12.5 },
    limits: { messages: 100000, posts: 5000, storage: 50 },
    is_active: true,
    created_at: new Date().toISOString()
  },
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    addTenant: (state, action: PayloadAction<Omit<Tenant, 'id' | 'created_at'>>) => {
      const newTenant: Tenant = {
        ...action.payload,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      state.tenants.push(newTenant);
    },
    updateTenant: (state, action: PayloadAction<{ id: string; updates: Partial<Tenant> }>) => {
      const { id, updates } = action.payload;
      const tenantIndex = state.tenants.findIndex(tenant => tenant.id === id);
      if (tenantIndex !== -1) {
        state.tenants[tenantIndex] = { ...state.tenants[tenantIndex], ...updates };
      }
    },
    deleteTenant: (state, action: PayloadAction<string>) => {
      state.tenants = state.tenants.filter(tenant => tenant.id !== action.payload);
    },
    setCurrentTenant: (state, action: PayloadAction<Tenant | null>) => {
      state.currentTenant = action.payload;
    },
  },
});

export const { addTenant, updateTenant, deleteTenant, setCurrentTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
