import React from "react";

export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center gap-2 pb-6">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setPage(index + 1)}
          className={`rounded-full px-3 py-1 ${
            page === index + 1
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
