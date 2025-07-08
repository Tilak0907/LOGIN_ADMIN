'use client';

import { useEffect, useState } from 'react';

export default function EditEventForm() {
  const [formData, setFormData] = useState({
    eventName: '',
    type: '',
    teamSize: '',
    description: '',
    rules: '',
    maxRegistration: '',
    coordinatorSize: '',
    status: ''
  });

  const eventId = '123';
  const API_BASE = 'https://login.ezqueue.in/'; // Replace with your actual backend

  useEffect(() => {
    fetch(`${API_BASE}/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data);
      })
      .catch(err => {
        console.error('Error fetching event details:', err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      alert(result.message || 'Event updated!');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Something went wrong while updating!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Details</h2>

      <div className="grid grid-cols-3 gap-4">
        <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} className="p-2 border rounded" />

        <select name="type" value={formData.type} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Type</option>
          <option value="Technical">Technical</option>
          <option value="Non-Technical">Non-Technical</option>
        </select>

        <input type="number" name="teamSize" placeholder="Team Size" value={formData.teamSize} onChange={handleChange} className="p-2 border rounded" />
      </div>

      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="mt-4 w-full p-2 border rounded" rows={3} />

      <textarea name="rules" placeholder="Rules" value={formData.rules} onChange={handleChange} className="mt-4 w-full p-2 border rounded" rows={3} />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <input type="number" name="maxRegistration" placeholder="Max Registration" value={formData.maxRegistration} onChange={handleChange} className="p-2 border rounded" />

        <input type="number" name="coordinatorSize" placeholder="Coordinator Size" value={formData.coordinatorSize} onChange={handleChange} className="p-2 border rounded" />
      </div>

      {/* Only 'Closed' status remains */}
      <div className="mt-4">
        <label>
          <input
            type="radio"
            name="status"
            value="Closed"
            checked={formData.status === 'Closed'}
            onChange={handleChange}
          />
          <span className="ml-2">Closed</span>
        </label>
      </div>

      <button type="submit" className="mt-4 bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-600">
        Submit
      </button>
    </form>
  );
}
