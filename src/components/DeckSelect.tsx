import { Deck } from "../data/decks";

type Props = {
    decks: Deck[];
    activeDeckId: string;
    onChange: (deckId: string) => void;
}

export default function DeckSelect({ decks, activeDeckId, onChange }: Props) {
    return (
        return (
    <div>
      <label className="small" htmlFor="deck">Deck</label><br />
      <select
        id="deck"
        className="select"
        value={activeDeckId}
        onChange={(e) => onChange(e.target.value)}
      >
        {decks.map(d => (
          <option key={d.id} value={d.id}>{d.title}</option>
        ))}
      </select>
    </div>
  );
}