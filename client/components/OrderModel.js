"use client";
import { useEffect, useState } from "react";
import { getSnacks } from "../services/snackService";
import { createOrder } from "../services/orderService";

export default function OrderModal({ studentId, onClose, onSuccess }) {
  const [snacks, setSnacks] = useState([]);
  const [snackId, setSnackId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch snacks on mount
  useEffect(() => {
    getSnacks()
      .then(res => {
        setSnacks(res.data);
        if (res.data.length > 0) setSnackId(res.data[0]._id); // default first snack
      })
      .catch(err => console.error("Failed to fetch snacks:", err));
  }, []);

  const handleOrder = async () => {
    if (!snackId) {
      setError("Select a snack");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await createOrder({
        studentId,
        snackId,
        quantity: quantity, // ensure quantity is number
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="font-bold mb-2">Place Order</h2>

        <select
          value={snackId} // show default selected snack
          className="border p-2 w-full mb-2"
          onChange={(e) => setSnackId(e.target.value)}
        >
          {snacks.length === 0 && <option>Loading snacks...</option>}
          {snacks.map((snack) => (
            <option key={snack._id} value={snack._id}>
              {snack.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          max={9}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between mt-3">
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </button>
          <button
            onClick={handleOrder}
            disabled={loading || snacks.length === 0}
            className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            {loading ? "Placing..." : "Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
