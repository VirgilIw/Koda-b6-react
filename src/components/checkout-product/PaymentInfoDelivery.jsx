import React from "react";
import { Mail, User, MapPin } from "lucide-react";

export default function PaymentInfoDelivery({ formData, setFormData }) {
  const data = [
    { label: "Dine in", value: "dinein" },
    { label: "Door Delivery", value: "door delivery" },
    { label: "Pick Up", value: "pickup" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-5 w-full max-w-3xl">
      <h2 className="mb-8 text-3xl font-semibold">Payment Info & Delivery</h2>

      {/* EMAIL */}
      <div className="mb-6">
        <label className="mb-2 block font-medium">Email</label>
        <div className="flex items-center rounded-xl border bg-gray-50 px-4 py-3">
          <Mail className="mr-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* FULL NAME */}
      <div className="mb-6">
        <label className="mb-2 block font-medium">Full Name</label>
        <div className="flex items-center rounded-xl border bg-gray-50 px-4 py-3">
          <User className="mr-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="mb-8">
        <label className="mb-2 block font-medium">Address</label>
        <div className="flex items-center rounded-xl border bg-gray-50 px-4 py-3">
          <MapPin className="mr-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Your Address"
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* DELIVERY */}
      <div>
        <p className="mb-3 font-semibold">Delivery</p>

        <div className="grid grid-cols-3 gap-4">
          {data.map((item) => (
            <label key={item.value} className="cursor-pointer">
              <input
                type="radio"
                name="delivery"
                value={item.value}
                required
                checked={formData.delivery === item.value}
                onChange={handleChange}
                className="peer hidden"
              />
              <div className="rounded-xl border py-3 text-center transition peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600">
                {item.label}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
