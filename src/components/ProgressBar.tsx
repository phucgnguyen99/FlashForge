type Props = {
  known: number;
  review: number;
  total: number;
  index: number; // 0-based
};

export default function ProgressBar({ known, review, total, index }: Props) {
  const remaining = Math.max(total - known - review, 0);
  return (
    <div className="progress">
      <span className="badge">Card {Math.min(index + 1, total)} / {total}</span>
      <span className="kv"><span className="dot green" /> Known: {known}</span>
      <span className="kv"><span className="dot orange" /> Review: {review}</span>
      <span className="small">Remaining: {remaining}</span>
    </div>
  );
}
