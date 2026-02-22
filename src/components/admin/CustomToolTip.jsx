import React from 'react'

function CustomToolTip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-green-600 font-bold">{`${payload[0].value} Cup`}</p>
      </div>
    );
  }
  return null;
}

export default CustomToolTip