"use client";
import { useState } from "react";

export default function AddRole() {
  const [roles, setRoles] = useState([
    {
      name: "Admin",
      privileges:
        "Dashboard, SLD, Production, Analysis, User Management, Solar Analytics, Health, Suppression, Power Analytics",
    },
    {
      name: "Operator",
      privileges:
        "Dashboard, Health, SLD, Analysis, Production, Suppression, Solar Analytics, Power Analytics, User Management",
    },
    {
      name: "Observer",
      privileges:
        "Dashboard, User Management, Production, Analysis, Solar Analytics, SLD, Health, Suppression, Power Analytics",
    },
    {
      name: "Viewer",
      privileges: "Dashboard, SLD, Health",
    },
  ]);
  const [roleName, setRoleName] = useState("");

  const handleAddRole = () => {
    if (roleName.trim() !== "") {
      setRoles([
        ...roles,
        { name: roleName.trim(), privileges: "Dashboard, SLD" },
      ]);
      setRoleName("");
    }
  };

  const handleDelete = (index) => {
    const updated = [...roles];
    updated.splice(index, 1);
    setRoles(updated);
  };

  return (
    <div className="relative w-full h-full min-h-[85vh] rounded-xl overflow-hidden shadow-2xl border-t-[5px] border-[#1d5999] backdrop-blur-md">
      {/* Frosted Ice Background */}
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
      ></div>

      {/* Frost Layer */}
      <div className="absolute inset-0 bg-cyan-100/20 backdrop-blur-[4px]"></div>

      {/* Main Content */}
      <div className="relative z-10 p-6 text-white">
        <h2 className="text-center text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full py-2 shadow-md mb-6">
          Add Role
        </h2>

        {/* Input + Add Button */}
        <div className="flex gap-2 mb-8 justify-center">
          <input
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter role name"
            className="p-2 w-[250px] rounded-md text-gray-900 border border-cyan-300 bg-white/70 placeholder-gray-500 shadow-inner outline-none"
          />
          <button
            onClick={handleAddRole}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md shadow-md transition"
          >
            + Add Role
          </button>
        </div>

        <h2 className="text-center text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full py-2 shadow-md mb-4">
          Roles List
        </h2>

        <div className="overflow-x-auto rounded-lg backdrop-blur-sm bg-white/10">
          <table className="table-auto w-full border border-cyan-200 text-sm text-white">
            <thead>
              <tr className="bg-cyan-800 text-center text-white">
                <th className="border border-cyan-200 px-3 py-2">Sr No</th>
                <th className="border border-cyan-200 px-3 py-2">Role Name</th>
                <th className="border border-cyan-200 px-3 py-2">Privileges</th>
                <th className="border border-cyan-200 px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0
                      ? "bg-white/10"
                      : "bg-white/5"
                  }`}
                >
                  <td className="border border-cyan-200 px-3 py-2 font-bold text-black">
                    {index + 1}
                  </td>
                  <td className="border border-cyan-200 px-3 py-2 font-semibold text-black">
                    {role.name}
                  </td>
                  <td className="border border-cyan-200 px-3 py-2 text-black">
                    {role.privileges}
                  </td>
                  <td className="border border-cyan-200 px-3 py-2 space-x-2">
                    <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-3 py-1 rounded shadow-sm transition">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded shadow-sm transition"
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
