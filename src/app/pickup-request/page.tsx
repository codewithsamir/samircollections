"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), { ssr: false });

interface FormData {
  name: string;
  address: string;
  phone: string;
  notes: string;
}

const LocationUpdate: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    notes: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [location, setLocation] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    setLocation(`Latitude: ${lat}, Longitude: ${lng}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/pickupRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmissionStatus('Your pickup request has been submitted successfully!');
        setFormData({ name: '', address: '', phone: '', notes: '' });
      } else {
        setSubmissionStatus('Error submitting request. Please try again.');
      }
    } catch (error) {
      setSubmissionStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <main className="container mx-auto py-10 px-6">
      <section className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">Request a Pickup</h2>
        <p className="text-lg mt-4 text-gray-600">Enter your address to request a pickup. We’ll come to your location to collect the items.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Map */}
        <div className="h-96 w-full">
          <MapComponent position={position} onClick={handleMapClick} />
        </div>

        {/* Right side: Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 px-4 py-2 w-full border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-semibold">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 px-4 py-2 w-full border rounded-lg"
              placeholder="Enter your full address"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 px-4 py-2 w-full border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block text-gray-700 font-semibold">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="mt-2 px-4 py-2 w-full border rounded-lg"
              rows={4}
            />
          </div>

          <button type="submit" className="mt-4 w-full py-2 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700">
            Submit Request
          </button>
        </form>
      </div>

      {/* Display submission status */}
      {submissionStatus && (
        <p className="text-center mt-4 text-green-600 font-semibold">
          {submissionStatus}
        </p>
      )}
    </main>
  );
};

export default LocationUpdate;
