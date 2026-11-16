import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { useAuth } from "../../contexts/AuthContext"; // adjust import if needed
import RequireAdmin from "./RequireAdmin";
import { toast } from "react-toastify";
import "../assets/css/adminpanel.css";

const CompleteSiteAdmin = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const clientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientsData);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleToggleAdmin = async (clientId, currentStatus) => {
    try {
      await updateDoc(doc(db, "clients", clientId), {
        isAdmin: !currentStatus,
      });
      setClients((prev) =>
        prev.map((client) =>
          client.id === clientId ? { ...client, isAdmin: !currentStatus } : client
        )
      );
      toast.success(`User ${!currentStatus ? "promoted to" : "demoted from"} admin`);
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast.error("Update failed: " + error.message);
    }
  };

  const handleDelete = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteDoc(doc(db, "clients", clientId));
      setClients((prev) => prev.filter((client) => client.id !== clientId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="loading">Loading users...</p>;

  return (
    <RequireAdmin>
      <div className="admin-panel-container">
        <h2 className="admin-panel-title">User Management Panel</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.fullname}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.isAdmin ? "✅ Yes" : "❌ No"}</td>
                <td>
                  <button
                    className="btn-toggle"
                    onClick={() => handleToggleAdmin(client.id, client.isAdmin)}
                  >
                    {client.isAdmin ? "Revoke Admin" : "Make Admin"}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RequireAdmin>
  );
};

export default CompleteSiteAdmin;
