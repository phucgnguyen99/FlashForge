import { useMemo, useState } from "react";
import DeckSelect from "./components/DeckSelect";
import Flashcard from "./components/Flashcard";
import Controls from "./components/Controls";
import ProgressBar from "./components/ProgressBar";
import { decks as allDecks, Deck } from "./data/decks";
import { useKeyBindings } from "./hooks/useKeyBindings";
import { clsx } from "clsx";

type ProgressState = Record<string, "known" | "review">; // key = cardId

function getDeckById(id: string): Deck {
  return allDecks.find(d => d.id === id) ?? allDecks[0];
}

export default function App() {
  const [activeDeckId, setActiveDeckId] = useState<string>(allDecks[0].id);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [progress, setProgress] = useState<ProgressState>({});

  const deck = useMemo(() => getDeckById(activeDeckId), [activeDeckId]);
  const total = deck.cards.length;
  const card = deck.cards[currentIndex];

  const knownCount = useMemo(
    () => Object.values(progress).filter(v => v === "known").length,
    [progress]
  );
  const reviewCount = useMemo(
    () => Object.values(progress).filter(v => v === "review").length,
    [progress]
  );

  // Actions
  const flip = () => setIsFlipped(f => !f);

  const next = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(i => i + 1);
      setIsFlipped(false);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setIsFlipped(false);
    }
  };

  const markKnown = () => {
    if (!card) return;
    setProgress(p => ({ ...p, [card.id]: "known" }));
  };

  const markReview = () => {
    if (!card) return;
    setProgress(p => ({ ...p, [card.id]: "review" }));
  };

  const onChangeDeck = (deckId: string) => {
    setActiveDeckId(deckId);
    setCurrentIndex(0);
    setIsFlipped(false);
    setProgress({}); // reset per deck for MVP
  };

  // Keyboard shortcuts
  useKeyBindings({
    flip,
    next,
    prev,
    known: markKnown,
    review: markReview,
  });

  return (
    <div className="container">
      <div className="header">
        <div className="title">🧠 Flashcards</div>
        <DeckSelect decks={allDecks} activeDeckId={activeDeckId} onChange={onChangeDeck} />
      </div>

      <div className="panel">
        <div className="row">
          <div className="small">Deck: <strong>{deck.title}</strong></div>
          <ProgressBar known={knownCount} review={reviewCount} total={total} index={currentIndex} />
        </div>

        {card ? (
          <>
            <Flashcard
              isFlipped={isFlipped}
              question={card.question}
              answer={card.answer}
              onFlip={flip}
            />

            <Controls
              onPrev={prev}
              onNext={next}
              onKnown={markKnown}
              onReview={markReview}
              disablePrev={currentIndex === 0}
              disableNext={currentIndex >= total - 1}
            />
          </>
        ) : (
          <div className="small">No cards found in this deck.</div>
        )}

        <div className={clsx("footer")}>
          <div className="small">
            Shortcuts: <code>Space</code> flip • <code>←/→</code> prev/next • <code>K</code> known • <code>R</code> review
          </div>
          <a className="link" href="https://vitejs.dev" target="_blank" rel="noreferrer">Powered by Vite + React</a>
        </div>
      </div>
    </div>
  );
}
