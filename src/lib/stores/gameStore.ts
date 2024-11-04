// src/lib/stores/gameStore.ts
import { writable } from 'svelte/store';
import type { Character, Question } from '../types';
import { generateRandomProps, generateImageUrl } from '../utils';
import { browser } from '$app/environment';

// Utility to load from localStorage or initialize with defaults
function loadStore<T>(key: string, defaultValue: T) {
	if (browser) {
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				return writable<T>(JSON.parse(stored));
			} catch (e) {
				console.error(`Error parsing localStorage key "${key}":`, e);
			}
		}
	}
	return writable<T>(defaultValue);
}

// Initialize with 24 random characters
const initialCharacters: Character[] = Array.from({ length: 24 }, (_, i) => {
	const props = generateRandomProps();
	return {
		id: i + 1,
		name: `Character ${i + 1}`,
		properties: props,
		probability: 100 / 24, // Initial equal probability
		imageUrl: generateImageUrl(props)
	};
});

export const characters = loadStore<Character[]>('characters', initialCharacters);
export const chatHistory = loadStore<{ question: Question; response: string }[]>('chatHistory', []);
export const questionsAsked = loadStore<Question[]>('questionsAsked', []);

// Subscribe to store changes to save to localStorage, only on the client
if (browser) {
	characters.subscribe((value) => localStorage.setItem('characters', JSON.stringify(value)));
	chatHistory.subscribe((value) => localStorage.setItem('chatHistory', JSON.stringify(value)));
	questionsAsked.subscribe((value) =>
		localStorage.setItem('questionsAsked', JSON.stringify(value))
	);
}
