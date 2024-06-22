export default function MiniCard({ children }) {
  return (
    <div className="bg-zinc-800 w-full  shadow rounded-xl hover:bg-zinc-200">
      {children}
    </div>
  );
}
