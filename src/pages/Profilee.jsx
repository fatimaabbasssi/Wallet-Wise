import React, { useEffect, useState } from "react";
import { 
auth, db ,
onAuthStateChanged,
doc, getDoc 
}
from "../firebase/config";


const Profilee = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        setUserData(data);
      } else {
        window.location.replace("/login");
      }
    });

    return () => unsubscribe();//current user
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-300">
          <img
            src={userData?.profileImage || "https://cdn-icons-png.flaticon.com/512/9131/9131590.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800" >
            {userData?.name || "Loading..."}
          </h2>
          <p className="text-gray-600 font-bold">Email : <span className="text-blue-800">{userData?.email || "Loading..."}</span></p>
          <p className="text-gray-600 font-bold ">Age : <span className="text-lime-500">{userData?.age || "Loading..."}</span></p>
        </div>
        <div>
          <button
            className="text-white px-4 py-2 rounded  transition bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 signOut"
            onClick={async () => {
              try {
                await auth.signOut();
                window.location.pathname = "/login";
                alert("Signed Out")
              } catch (error) {
                console.log("Signout Error:", error);
              }
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilee;