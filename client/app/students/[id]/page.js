"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getStudentById } from "@/services/studentService";
import OrderModal from "../../../components/OrderModel";

export default function StudentDetailPage() {
  const { id } = useParams(); // ✅ CORRECT WAY

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const res = await getStudentById(id);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchStudent(); // ✅ guard
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!data) return <p className="p-6">No data found</p>;

  const { student, orders } = data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{student.name}</h1>
      <p>Referral Code: {student.referralCode}</p>
      <p>Total Spent: ₹{student.totalSpent}</p>

      <div className="flex justify-between mt-6 mb-2">
        <h2 className="text-xl font-semibold">Orders</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Place Order
        </button>
      </div>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div key={order._id} className="border p-3 mb-2 rounded">
          <p>Snack: {order.snackId.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Amount: ₹{order.amount}</p>
        </div>
      ))}

      {open && (
        <OrderModal
          studentId={student._id}
          onClose={() => setOpen(false)}
          onSuccess={fetchStudent}
        />
      )}
    </div>
  );
}
