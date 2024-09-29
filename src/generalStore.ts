import { derived } from 'svelte/store';
import { persistedWritable } from './persistedWritable';
import type { Budget } from './types';

export const budget = persistedWritable<Budget>('budget', { blocks: [] });
