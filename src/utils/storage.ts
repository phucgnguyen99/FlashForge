import type { Deck } from "../data/decks";

const DECKS_KEY = "flashcards:decks";

export function loadDecks(): Deck[] {
    try {
        const raw = localStorage.getItem(DECKS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveDecks(decks: Deck[]) {
    try {
        localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    } catch {
        // ignore
    }
}