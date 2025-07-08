'use client';

import Image from 'next/image';
import { useState } from 'react';

type CoordinatorProps = {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  imageUrl: string;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
};

export default function CoordinatorCard({
  id = 'sample-id-123',
  name,
  email,
  mobile,
  gender,
  imageUrl,
  onDelete,
  onAdd,
}: CoordinatorProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({ name, email, mobile, gender });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const updateCoordinator = async () => {
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('mobile', formData.mobile);
      form.append('gender', formData.gender);
      if (imageFile) form.append('image', imageFile);

      const res = await fetch(`/api/coordinators/${id}`, {
        method: 'PUT',
        body: form,
      });

      const result = await res.json();
      if (res.ok) {
        alert('Coordinator updated successfully!');
        setShowUpdateModal(false);
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error while updating coordinator');
    }
  };

  const deleteCoordinator = async () => {
    try {
      const res = await fetch(`/api/coordinators/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Coordinator deleted successfully');
        setShowDeleteConfirm(false);
        onDelete?.(id);
      } else {
        const result = await res.json();
        alert(result.message || 'Delete failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error while deleting coordinator');
    }
  };

  const addCoordinator = async () => {
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('mobile', formData.mobile);
      form.append('gender', formData.gender);
      if (imageFile) form.append('image', imageFile);

      const res = await fetch(`/api/coordinators`, {
        method: 'POST',
        body: form,
      });

      const result = await res.json();
      if (res.ok) {
        alert('Coordinator added successfully!');
        setShowAddModal(false);
        onAdd?.();
      } else {
        alert(result.message || 'Add failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error while adding coordinator');
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoordinator();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoordinator();
  };

  return (
    <>
      {/* Header with Plus Icon */}
      <div className="mb-4 flex items-center justify-between max-w-md w-full">
        <h2 className="text-2xl font-semibold text-black-800">Coordinators</h2>
        <button
          className="bg-purple-700 text-white p-2 hover:bg-purple-800"
          onClick={() => setShowAddModal(true)}
          title="Add Coordinator"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Coordinator Card */}
      <div className="bg-gradient-to-r from-purple-300 to-purple-600 rounded-xl p-6 shadow-md max-w-md w-full ml-0 flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center shadow-lg">
            <Image
              src={imageUrl}
              alt="Coordinator"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 text-white">
          <div className="space-y-1 mb-4">
            <p><strong>{name}</strong></p>
            <p>{email}</p>
            <p>{mobile}</p>
            <p>{gender}</p>
          </div>
          <div className="space-x-2">
            <button
              className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button>
            <button
              className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Update Coordinator</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Name" />
              <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Email" />
              <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Mobile" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Profile Picture</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => document.getElementById('profile-pic-input-update')?.click()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    Choose Profile Picture
                  </button>
                  {imageFile && <span className="text-sm text-green-700">{imageFile.name}</span>}
                </div>
                <input
                  id="profile-pic-input-update"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imageFile && (
                  <img src={URL.createObjectURL(imageFile)} alt="Preview" className="mt-2 h-16 w-16 rounded-full object-cover" />
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowUpdateModal(false)} className="px-4 py-1 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-1 bg-purple-700 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center space-y-4">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{name}</strong>?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-1 border rounded">Cancel</button>
              <button onClick={deleteCoordinator} className="px-4 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Add Coordinator</h2>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Name" />
              <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Email" />
              <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Mobile" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Profile Picture</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => document.getElementById('profile-pic-input-add')?.click()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    Choose Profile Picture
                  </button>
                  {imageFile && <span className="text-sm text-green-700">{imageFile.name}</span>}
                </div>
                <input
                  id="profile-pic-input-add"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imageFile && (
                  <img src={URL.createObjectURL(imageFile)} alt="Preview" className="mt-2 h-16 w-16 rounded-full object-cover" />
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-1 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-1 bg-purple-700 text-white rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
