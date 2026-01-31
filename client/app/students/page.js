"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getStudents } from "@/services/studentService";
import CreateStudentForm from "@/components/CreateStudentForm";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 👇 reusable fetch function
  const fetchStudents = async () => {
    setLoading(true);
    const res = await getStudents();
    setStudents(res.data);
    setLoading(false);
  };

  // 👇 page load pe fetch
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      {/* 👇 create student form */}
      <CreateStudentForm onSuccess={fetchStudents} />

      {loading && <p>Loading students...</p>}

      {students.map(stu => (
        <div
          key={stu._id}
          className="border p-4 mb-3 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{stu.name}</p>
            <p>Referral: {stu.referralCode}</p>
            <p>Total Spent: ₹{stu.totalSpent}</p>
          </div>

          <Link
            href={`/students/${stu._id}`}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
