import type { Deck } from "../data/decks";

type Props = {
    decks: Deck[];
    activeDeckId: string | null;    // the activeDeckId can be null if there are no decks yet
    onChange: (deckId: string) => void;
}

export default function DeckSelect({ decks, activeDeckId, onChange }: Props) {
    return (
        <div>
        <label className="small" htmlFor="deck">Deck</label><br />
        <select
            id="deck"
            className="select"
            value={activeDeckId ?? ""}  // activeDeckId can be null if there are no decks yet
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="" disabled>Select a deck…</option>
            {decks.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
            ))}
        </select>
    </div>
  );
}