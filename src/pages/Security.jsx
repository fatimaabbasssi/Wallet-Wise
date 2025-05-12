import React, { useState } from 'react';
import {
auth , updatePassword
} 
from '../firebase/config.js';

const Security = () => {
  const [newPassword, setNewPassword] = useState('');
  const user = auth.currentUser;

  const handlePasswordUpdate = async () => {
    try {
      await updatePassword(user, newPassword);
      alert('Password updated successfully');
      setNewPassword('');
    } catch (error) {
      alert(error);
    }
  };

 
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Security Settings</h2>

      {/* Password Update */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">New Password</label>
        <input type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter new password"/>
        <button
          onClick={handlePasswordUpdate}
          className=" text-black w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 py-2 rounded-lg transition duration-200 signOut">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Security;