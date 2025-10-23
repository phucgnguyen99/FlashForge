import { useMemo, useState } from "react";
import type { Deck, Card } from "../data/decks";

type Props = {
    onSave: (deck: Deck) => void;
};

function uid(prefix = "id"): string {
    return `${prefix}_$${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function DeckBuilder({ onSave }: Props) {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [cards, setCards] = useState<Card[]>([]);

    const canAdd = question.trim().length > 0 && answer.trim().length > 0;
    const canSave = title.trim().length > 0 && cards.length > 0;

    const addCard = () => {
    if (!canAdd) return;
    setCards(prev => [...prev, { id: uid("c"), question: question.trim(), answer: answer.trim() }]);
    setQuestion("");
    setAnswer("");
    };

    const removeCard = (id: string) => {
        setCards(prev => prev.filter(c => c.id !== id));
    };

    const saveDeck = () => {
        if (!canSave) return;
        const deck: Deck = { id: uid("d"), title: title.trim(), cards };
        onSave(deck);
        // reset form after save
        setTitle("");
        setQuestion("");
        setAnswer("");
        setCards([]);
    };

    const previewCount = useMemo(() => cards.length, [cards]);

    return (
        <div className="panel" style={{ marginTop: 12 }}>
        <div className="row"><div className="title">➕ Create Deck</div></div>

        <div style={{ display: "grid", gap: 12 }}>
            <div>
            <label className="small">Deck Title</label><br />
            <input
                className="select" // reuse styles for simplicity
                style={{ width: "100%" }}
                placeholder="e.g. Java Core, AWS Basics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>

            <div className="panel" style={{ padding: 12 }}>
            <div className="small" style={{ marginBottom: 8 }}>Add Cards</div>
            <div style={{ display: "grid", gap: 8 }}>
                <input
                className="select"
                style={{ width: "100%" }}
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                />
                <textarea
                className="select"
                rows={3}
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="controls">
                <button className="btn" onClick={addCard} disabled={!canAdd}>Add card</button>
                <span className="small">Cards in deck: <strong>{previewCount}</strong></span>
                </div>
            </div>

            {cards.length > 0 && (
                <div style={{ marginTop: 12 }}>
                <div className="small" style={{ marginBottom: 8 }}>Current Cards</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                    {cards.map((c, idx) => (
                    <li key={c.id} className="panel" style={{ padding: 12 }}>
                        <div className="small">#{idx + 1}</div>
                        <div style={{ marginTop: 6 }}>
                        <div className="card-label">Q</div>
                        <div className="card-text" style={{ fontSize: 16 }}>{c.question}</div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                        <div className="card-label">A</div>
                        <div className="card-text" style={{ fontSize: 16 }}>{c.answer}</div>
                        </div>
                        <div className="controls" style={{ marginTop: 8 }}>
                        <button className="btn" onClick={() => removeCard(c.id)}>Remove</button>
                        </div>
                    </li>
                    ))}
                </ul>
                </div>
            )}
            </div>

            <div className="controls">
            <button className="btn btn-primary" onClick={saveDeck} disabled={!canSave}>Save deck</button>
            </div>
        </div>
        </div>
    );
}