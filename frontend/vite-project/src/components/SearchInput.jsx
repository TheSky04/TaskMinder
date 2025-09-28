export default function SearchInput() {
  return (
    <div className="relative w-96">
      <svg
        className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0a7 7 0 1110-10 7 7 0 01-10 10z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 rounded-lg w-full pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}