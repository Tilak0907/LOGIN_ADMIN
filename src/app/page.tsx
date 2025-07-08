'use client';

import { useState } from 'react';
import EditEventForm from '../../components/EditEventForm';
import CoordinatorCard from '../../components/CoordinatorCard';
import VolunteerCard from '../../components/VolunteerCard';
import { Plus } from 'lucide-react';

export default function EditPage() {
  const [sectionWidth, setSectionWidth] = useState(600); // initial width in px

  // Dummy data (replace with fetch from DB later)
  const coordinators = [
    {
      name: 'Coordinator Name',
      email: 'coordinator@example.com',
      mobile: '9876543210',
      gender: 'Male',
      imageUrl: '/minion.png'
    }
  ];

  const volunteers = [
    {
      name: 'Volunteer Name',
      email: 'volunteer@example.com',
      mobile: '9876543210',
      gender: 'Female',
      imageUrl: '/minion.png'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-10">
      
     

      {/* Edit Event Form Section */}
     <section className="bg-white p-6 rounded-xl shadow w-full sm:max-w-md md:max-w-lg lg:max-w-xl transition-all duration-300">

        <EditEventForm />
      </section>

      {/* Coordinators Section */}
      <section className="bg-white p-6 rounded-xl shadow max-w-md w-full">
        <div className="flex justify-between items-center mb-4"> 
        </div>
        <div className="space-y-4">
          {coordinators.map((coord, index) => (
            <CoordinatorCard key={index} {...coord} />
          ))}
        </div>
      </section>

      {/* Volunteers Section */}
     <section className="bg-white p-6 rounded-xl shadow max-w-md w-full">
        <div className="space-y-4">
          {volunteers.map((vol, index) => (
            <VolunteerCard key={index} {...vol} />
          ))}
        </div>
      </section>
    </main>
  );
}
