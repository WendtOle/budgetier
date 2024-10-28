import { derived, writable } from 'svelte/store';
import { persistedWritable } from './persistedWritable';
import type { Budget } from './types';

export const budget = persistedWritable<Budget>('budget', { blocks: {}, order: [] });

export const budgetBlockToEdit = writable<string | undefined>(undefined);
