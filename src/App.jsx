import React, { useState } from 'react';

const permissions = [
  {
    id: 'photos',
    title: 'Photo Access',
    description: 'Allow the Photo Editor app to access your stored images.',
    consequence: 'Your private images may be uploaded to company servers and sold to third parties.',
    video: '/videos/photo_consequence.mp4'
  },
  {
    id: 'microphone',
    title: 'Microphone Access',
    description: 'Allow the Calculator app to access your microphone.',
    consequence: 'Microphone access could enable eavesdropping on your private conversations.',
    video: '/videos/mic_consequence.mp4'
  },
  {
    id: 'location',
    title: 'Location Access',
    description: 'Allow the Weather app to access your device location.',
    consequence: 'Your location data could be used for targeted ads and surveillance.',
    video: '/videos/location_consequence.mp4'
  }
];

export default function App() {
  const [choices, setChoices] = useState({});
  const [popup, setPopup] = useState(null);

  const handleChoice = (id, choice) => {
    setChoices(prev => ({ ...prev, [id]: choice }));
  };

  const allDecided = permissions.every(perm => choices[perm.id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className={`bg-white shadow-lg rounded p-6 w-full max-w-2xl ${popup ? 'blur-sm' : ''}`}>
        <h2 className="text-xl font-bold text-center mb-4">Manage App Permissions</h2>
        {permissions.map((perm) => (
          <div key={perm.id} className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold mb-1">{perm.title}</h3>
            <p className="mb-2">{perm.description}</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => handleChoice(perm.id, 'accept')}>✓</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleChoice(perm.id, 'deny')}>✗</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => setPopup(perm)}>❗</button>
            </div>
          </div>
        ))}
        {allDecided && (
          <div className="text-center mt-6">
            <p className="mb-4">You have reviewed all permissions.</p>
            <a href="https://forms.gle/YOUR_GOOGLE_FORM_LINK" target="_blank" rel="noopener noreferrer">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Continue to Final Survey</button>
            </a>
          </div>
        )}
      </div>

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 w-full max-w-lg">
            <h4 className="text-md font-semibold mb-2">What can happen if you grant this?</h4>
            <p className="mb-4">{popup.consequence}</p>
            <video controls className="rounded w-full mb-4">
              <source src={popup.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setPopup(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
