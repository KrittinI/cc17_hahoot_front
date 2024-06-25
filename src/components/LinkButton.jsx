export default function LinkButton({ text, linkButton, onClick }) {
  return (
    <div className="flex items-baseline gap-1">
      <small className="text-black">{text}</small>
      <button
        onClick={onClick}
        className="btn btn-link text-xs p-0.5 text-blue"
      >
        {linkButton}
      </button>
    </div>
  );
}
