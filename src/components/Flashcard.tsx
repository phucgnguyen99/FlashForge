type Props = {
  isFlipped: boolean;
  question: string;
  answer: string;
  onFlip: () => void;
};

export default function Flashcard({ isFlipped, question, answer, onFlip }: Props) {
  return (
    <div className="flashcard" role="button" aria-label="Flashcard" onClick={onFlip}>
      <div className={`flip ${isFlipped ? "flipped" : ""}`}>
        <div className="face front">
          <div className="card-label">Question</div>
          <div className="card-text">{question}</div>
          <div className="small" style={{opacity: 0.7}}>Click or press Space to flip</div>
        </div>
        <div className="face back">
          <div className="card-label">Answer</div>
          <div className="card-text">{answer}</div>
          <div className="small" style={{opacity: 0.7}}>Click or press Space to flip back</div>
        </div>
      </div>
    </div>
  );
}
