type Props = {
  onPrev: () => void;
  onNext: () => void;
  onKnown: () => void;
  onReview: () => void;
  disablePrev: boolean;
  disableNext: boolean;
};

export default function Controls({
  onPrev, onNext, onKnown, onReview, disablePrev, disableNext,
}: Props) {
  return (
    <div className="controls">
      <button className="btn" onClick={onPrev} disabled={disablePrev}>← Prev</button>
      <button className="btn" onClick={onKnown}>✅ Known (K)</button>
      <button className="btn" onClick={onReview}>🔁 Review (R)</button>
      <button className="btn btn-primary" onClick={onNext} disabled={disableNext}>Next →</button>
    </div>
  );
}
