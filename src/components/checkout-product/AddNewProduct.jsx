import React from "react";

export default function AddNewProduct({ data, onClose }) {
  const [page, setPage] = React.useState(1);

  const limit = 2;
  const totalData = data.products.length;
//   console.log(totalData)
  const totalPages = Math.ceil(totalData / limit);

  const startIndex = (page - 1) * limit;
  const currentProducts = data.products.slice(startIndex, startIndex + limit);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-lg">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Add New Product</h2>
        <button
          onClick={onClose}
          className="rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 gap-4">
        {currentProducts.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border bg-white p-4 shadow-sm transition hover:border-orange-400 hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <span className="text-sm font-medium text-orange-500">
                Idr. {item.price?.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-full rounded-lg object-cover"
              />
            </div>

            <p className="text-sm text-gray-500">
              {item.description || "No description available"}
            </p>

            <button className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded bg-gray-200 px-4 py-2 text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`h-9 w-9 rounded-full text-sm font-medium transition ${
                  page === pageNumber
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } `}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded bg-gray-200 px-4 py-2 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
