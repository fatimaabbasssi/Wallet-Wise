import React, { useState, useEffect } from "react";
import { db, auth,
  collection,
  addDoc,
  query,
  where,
  onSnapshot, } from "../firebase/config.js";


const Income = () => {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeList, setIncomeList] = useState([]);

  // Income add function
  const handleAddIncome = async (e) => {
    e.preventDefault();
    if (!month || !amount) return;

    // income object
    const incomeData = {
      month,
      amount: parseFloat(amount),
      createdAt: new Date(),
      userId: auth.currentUser.uid, ///// current userId
    };

    // adding to firebase 

    try {
      await addDoc(collection(db, "income"),
       incomeData
      ); 
      setMonth("");
      setAmount("");
    } catch (error) {
      console.error("Income add : ", error);
    }
  };

  // data loading handling
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const currentUserData = query(
      collection(db, "income"),
      where("userId", "==", user.uid) // only current user data
    );

    // Real-time data 
    const unsubscribe = onSnapshot(currentUserData, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncomeList(data); // state me save karo
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Monthly Income</h2>

      {/* Income Form */}
      <form onSubmit={handleAddIncome} className="bg-white shadow p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Month</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Income Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 add-income">
            Add Income
          </button>
        </div>
      </form>

      {/* Income List */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Monthly Income Records</h3>
        {incomeList.length === 0 ? (
          <p className="text-gray-500">No income records added yet.</p>
        ) : (
          <ul className="space-y-2">
           {incomeList.map((item) => {
             const createdAt = item.createdAt?.seconds
             ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : "No Date";
              return (
                  <li key={item.id} className="flex justify-between border-b pb-1 text-sm">
                    <span>{item.month}</span> 
                    <span className="text-gray-500">{createdAt}</span>
                    <span>Rs {item.amount}</span>
                  </li>
                );
             })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Income;










