import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export default function AdminResourceUpload() {
  const { pathname } = useLocation();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Other",
    link: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("link", form.link);
    if (form.image) formData.append("image", form.image);

    try {
      if (editId) {
        await API.put(`/resources/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Resource updated");
      } else {
        await API.post("/resources", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Resource uploaded successfully");
      }
      setForm({ title: "", description: "", category: "Other", link: "", image: null });
      setEditId(null);
      fetchResources();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const fetchResources = async () => {
    try {
      const res = await API.get("/resources");
      setResources(res.data.resources);
    } catch {
      toast.error("Failed to fetch resources");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await API.delete(`/resources/${id}`, { withCredentials: true });
      toast.success("Resource deleted");
      fetchResources();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (resource) => {
    setForm({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      link: resource.link,
      image: null,
    });
    setEditId(resource._id);
  };

  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex bg-emerald-50 text-gray-800">
      <AdminSidebar />
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-bold text-emerald-700 mb-4">
          {editId ? "Edit Resource" : "Upload Resource"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border p-2 rounded" />
          <input name="link" value={form.link} onChange={handleChange} placeholder="Resource Link" required className="border p-2 rounded" />

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-1 md:col-span-2" />

          <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
            {['Phishing', 'Passwords', 'Social Engineering', 'Malware', 'Other'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input type="file" name="image" onChange={handleChange} accept="image/*" className="border p-2 rounded" />

          <button type="submit" className="bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700">
            {editId ? "Update" : "Submit"}
          </button>
        </form>

        <div className="mt-10 mb-4">
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 border p-2 rounded"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Uploaded Resources</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border rounded shadow text-sm">
            <thead>
              <tr className="bg-emerald-100">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Link</th>
                <th className="p-3 text-left">Uploaded</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-3">{r.title}</td>
                  <td className="p-3">{r.category}</td>
                  <td className="p-3 text-blue-600 underline"><a href={r.link} target="_blank" rel="noreferrer">View</a></td>
                  <td className="p-3">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEdit(r)} className="text-emerald-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ToastContainer position="bottom-right" theme="light" />
      </main>
    </div>
    </>
  );
  
}