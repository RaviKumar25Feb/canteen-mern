"use client";
import { useState } from "react";
import { createStudent } from "../services/studentService";

export default function CreateStudentForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    if (!name || !referralCode) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createStudent({
        name,
        referralCode
      });

      // clear form
      setName("");
      setReferralCode("");

      // 🔥 refresh students list
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded">
      <h2 className="font-semibold mb-2">Create Student</h2>

      <input
        type="text"
        placeholder="Student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Referral code"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Student"}
      </button>
    </form>
  );
}
