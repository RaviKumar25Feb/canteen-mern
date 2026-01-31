"use client";
import { useEffect, useState } from "react";
import { getSnacks } from "../../services/snackService";
import OrderModal from "../../../components/OrderModel";
export default function SnacksPage({ onOrderClick }) {
  const [snacks, setSnacks] = useState([]);

  const fetchSnacks = async () => {
    try {
      const res = await getSnacks();
      setSnacks(res.data);
    } catch (err) {
      console.error("Failed to fetch snacks:", err);
    }
  };

  useEffect(() => {
    fetchSnacks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Snacks Menu</h1>

      {snacks.length === 0 && (
        <p className="text-gray-500 italic text-center">No snacks available</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {snacks.map((snack) => (
          <div
            key={snack._id}
            className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            {/* Snack Info */}
            <div className="p-5 flex flex-col gap-2">
              <p className="text-xl font-semibold">{snack.name}</p>
              <p className="text-gray-600">Price: ₹{snack.price}</p>
              <p className="text-gray-500 text-sm">
                Orders: {snack.ordersCount}
              </p>
            </div>

            {/* Order Button */}
            <div className="p-5">
              <button
                onClick={() => onOrderClick(snack)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
