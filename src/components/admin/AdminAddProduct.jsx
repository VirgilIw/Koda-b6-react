import React from "react";
import http from "../../lib/http";

export default function AdminAddProduct({ onClose }) {
  const [open, setOpen] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [sizes, setSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [form, setForm] = React.useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    size: [],
    file: null,
  });

  // open animation
  React.useEffect(() => {
    setOpen(true);
  }, []);

  // fetch sizes
  React.useEffect(() => {
    (async () => {
      const res = await http("/admin/sizes", null);
      const data = await res.json();
      setSizes(data.result || []);
    })();
  }, []);

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
    setTimeout(onClose, 300);
  };

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // file upload
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // checkbox size toggle
  const handleSizeChange = (value) => {
    setForm((prev) => {
      if (prev.size.includes(value)) {
        return {
          ...prev,
          size: prev.size.filter((s) => s !== value),
        };
      } else {
        return {
          ...prev,
          size: [...prev.size, value],
        };
      }
    });
  };

  // submit
  const handleAddNewProduct = async () => {
    setError("");
    setSuccess("");

    if (!form.name || !form.price || !form.stock) {
      setError("Name, price, and stock are required!");
      return;
    }

    setLoading(true);

    try {
      const body = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        sizes: form.size,
        images: form.file ? form.file.name : null,
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed request");
      }

      const data = await res.json();
      console.log(data);

      setSuccess("Product berhasil ditambahkan");

      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Drawer */}
      <div
        className={`ml-auto h-full w-full max-w-md transform overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Add Product</h1>
          <button
            onClick={handleClose}
            className="text-xl text-red-500 hover:animate-spin"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Upload */}
        <div className="mb-4">
          <p className="mb-2 text-sm">Photo Product</p>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                "🖼️"
              )}
            </div>

            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />

            <label
              htmlFor="upload"
              className="cursor-pointer rounded-md bg-orange-500 px-4 py-1.5 text-sm text-white"
            >
              Upload
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            min={0}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {/* Size checkbox */}
        <div className="mb-6">
          <p className="mb-2 text-sm">Product Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((item) => (
              <label
                key={item.id}
                className={`cursor-pointer rounded-lg border px-3 py-1 text-sm ${
                  form.size.includes(item.id)
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "hover:bg-orange-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.size.includes(item.id)}
                  onChange={() => handleSizeChange(item.id)}
                  className="hidden"
                />
                {item.size_name}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleAddNewProduct}
          disabled={loading}
          className={`w-full rounded-lg py-2 text-white transition-opacity ${
            loading
              ? "cursor-not-allowed bg-orange-300"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
        <div className="mt-2">
          {error && (
            <div className="mb-3 rounded bg-red-100 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-3 rounded bg-green-100 px-3 py-2 text-sm text-green-600">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
