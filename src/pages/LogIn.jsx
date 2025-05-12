import React, { useState } from 'react'

import { auth ,
signInWithEmailAndPassword,
signOut,
GoogleAuthProvider,
signInWithPopup
 } from '../firebase/config'
const LogIn = () => {

    const [formData, setFormData] = useState({
      email: "",
      password: "",
  })
  
  
  let handleChange = (e) =>{
  
    console.log(e.target.name , e.target.value);
    
    setFormData((preview) =>(
      {
        ...preview,
        [e.target.name]: e.target.value
      }
    ))
  }
  
  
  
  
  let handleSubmit = async (e) =>{
  e.preventDefault()
  
  try {
   let userData = await signInWithEmailAndPassword(
      auth ,
      formData.email ,
      formData.password
    )
  
    let user = userData.user
    alert('Signed-In succesfully')

    if(user){window.location.pathname= '/profilee'}
    
  } catch (error) {
    console.log(error , "in signup function");
    
  }
  
  }
  

  //Continue with Google 

  let handleGoogleLogin = async ()=>{

    let provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" });//select account firebase

    try {
        await signOut(auth);  //first logOut 
        console.log("User logged out before signIn attempt.");

        const result = await signInWithPopup(auth, provider); //again sign In with google 
        console.log("User logged in: ", result.user);
    } catch (error) {
        console.error("Google log-in Error:", error);
    }
  }
  
  
  return (
   <>
   
   <h1 className='login'>LogIn</h1>

<form  onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-7 rounded form  animate__animated animate__bounceInDown">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input  value={formData.email} onChange={handleChange} type="email" name='email'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input  value={formData.password} onChange={handleChange} type="password" name='password'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password" required />
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 signUp">Log-In</button>
  <p className='text-center py-3'>or</p>
  <button onClick={handleGoogleLogin}  type="button" className="flex items-center justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center  signUp">
     <img src="https://pngimg.com/d/google_PNG19635.png" alt="google"  className='googlie'/> Continue With Google
     </button>
</form>

   </>
  )
}

export default LogIn