import React from "react";
import http from "../lib/http";
import AdminAddProduct from "../components/admin/AdminAddProduct";

export default function AdminProductList() {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const limit = 6;
  const [add, setAdd] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const res = await http(`/admin/products?page=${page}`);
      const json = await res.json();
      console.log(json.result);
      setTotal(json.total);
      setData(json.result);
    })();
  }, [page]);

  // filter search
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  // checkbox logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(filteredData.map((item) => item.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handleAddProduct = () => {
    setAdd(!add);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="pt-5 text-2xl font-semibold">Product List</h1>
      </div>

      {/* Top Bar */}
      <div className="mb-4 flex justify-between gap-2">
        <button
          className="rounded-lg bg-orange-500 px-4 py-2 text-white"
          onClick={handleAddProduct}
        >
          Add Product
        </button>

        {add && <AdminAddProduct onClose={() => setAdd(false)} />}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Product Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border px-3 py-2"
          />
          <button className="rounded-lg bg-orange-500 px-4 py-2 text-white">
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-3">
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Desc</th>
              <th className="p-3">Size</th>
              <th className="p-3">Method</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t align-top hover:bg-gray-50">
                {/* Checkbox */}
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                </td>

                {/* Image */}
                <td className="p-3">
                  <img
                    src={
                      item.image || "http://localhost:8888/images/default.png"
                    }
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </td>

                {/* Name */}
                <td className="p-3 font-medium">{item.name}</td>

                {/* Price */}
                <td className="p-3">IDR {item.price}</td>

                {/* Desc */}
                <td className="max-w-xs p-3 text-gray-500">
                  <p className="line-clamp-2">{item.description}</p>
                </td>

                {/* Size (dummy kalau belum ada di API) */}
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    {item.sizes.map((size, i) => (
                      <span
                        key={i}
                        className="rounded bg-gray-100 px-2 py-1 text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Method */}
                <td className="p-3">
                  <div className="flex gap-1">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600">
                      Deliver
                    </span>
                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-600">
                      Dine In
                    </span>
                  </div>
                </td>

                {/* Stock */}
                <td className="p-3">{item.stock}</td>

                {/* Action */}
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button className="rounded px-3 py-1 text-white">✏️</button>
                    <button className="rounded px-3 py-1 text-white">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between p-4 text-sm text-gray-500">
          <span>
            Show {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of
            {total} products
          </span>
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-2 py-1 disabled:opacity-50"
            >
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`rounded px-2 py-1 ${
                  page === i + 1 ? "bg-orange-500 text-white" : "bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-2 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
