import React, { useState } from 'react'
import { 
auth, 
createUserWithEmailAndPassword, 
db, setDoc, doc 
}
from '../firebase/config.js'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData((preview) => ({
      ...preview,
      [e.target.name]: e.target.value
    }));
  };

  const imageUploadtoCloudinary = async (file) => {

    const cloudName = "diryrdyol";
    const presetName = "blog-website";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetName); // Replace this
    formData.append("cloud_name", cloudName); // Replace this

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "https://cdn-icons-png.flaticon.com/512/9131/9131590.png";
      if (imageFile) {
        imageUrl = await imageUploadtoCloudinary(imageFile);
      }

      const userData = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userData.user;

      console.log( window.location.pathname);
      
      alert('Signed-Up succesfully')
      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          userId: user.uid,
          name: formData.name,
          email: formData.email,
          age : formData.age,
          profileImage: imageUrl,
          password: formData.password, 
        });

        window.location.pathname = '/profilee';
      }
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <>
      <h1 className='login'>SignUp</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-7 rounded form animate__animated animate__bounceInUp">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input type="text" name='name' value={formData.name} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Full Name" required />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name='email' value={formData.email} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter your email" required />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" name='password' value={formData.password} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Password" required />
        </div>

        <div className="mb-5">
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your age</label>
          <input type="number" name='age' value={formData.age} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter your age" required />
        </div>

        <div className="mb-5">
          <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Profile</label>
          <input type="file" name='file' id="file" onChange={(e) => setImageFile(e.target.files[0])}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>

        <button type="submit"
          className=" signUp text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
         Register
        </button>
      </form>
    </>
  );
};

export default SignUp;