"use client";
import { useState } from "react";

export default function ViewUsers() {
  const [users, setUsers] = useState([
    {
      name: "Jamal Nasir",
      email: "Jamal@jiotp.com",
      role: "Admin",
    },
    {
      name: "Hammad Javed",
      email: "hammad.javed@jiotp.com",
      role: "Operator",
    },
    {
      name: "Nexalyze",
      email: "test@nexalyze.com",
      role: "Observer",
    },
    {
      name: "Mehwish Arshad",
      email: "mehwish.arshd@jiotp.com",
      role: "Operator",
    },
    {
      name: "Safoora Ifti",
      email: "Saf@gmail.com",
      role: "Operator",
    },
  ]);

  const handleDelete = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  return (
    <div className="relative min-h-[85vh] w-full shadow-lg rounded-xl overflow-hidden border-t-[5px] border-[#1d5999]">
      {/* Frozen Ice Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://cdn.vectorstock.com/i/500p/27/89/freezy-ice-surface-horizontal-background-natural-vector-53782789.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          filter: "blur(2px)",
        }}
      />
      <div className="absolute inset-0 bg-cyan-100/20 backdrop-blur-[3px]" />

      {/* Main Content */}
      <div className="relative z-10 p-6 text-black">
        <h2 className="text-lg font-bold mb-4">Users List</h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="table-auto w-full border border-cyan-200 text-sm text-white">
            <thead>
              <tr className="bg-cyan-800 text-center">
                <th className="border border-cyan-200 px-3 py-2">Sr No</th>
                <th className="border border-cyan-200 px-3 py-2">Name</th>
                <th className="border border-cyan-200 px-3 py-2">Email</th>
                <th className="border border-cyan-200 px-3 py-2">Role</th>
                <th className="border border-cyan-200 px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <td className="border border-cyan-200 px-3 py-2 text-black font-semibold">
                    {index + 1}
                  </td>
                  <td className="border border-cyan-200 px-3 py-2 text-black">
                    {user.name}
                  </td>
                  <td className="border border-cyan-200 px-3 py-2 text-black">
                    {user.email}
                  </td>
                  <td className="border border-cyan-200 px-3 py-2 text-black">
                    {user.role}
                  </td>
                  <td className="border border-cyan-200 px-3 py-2 space-x-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded transition shadow-sm">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded transition shadow-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
