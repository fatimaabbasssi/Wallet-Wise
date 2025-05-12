import React, { useState, useEffect } from "react";
import {
  auth,
  db,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
}
  from "../firebase/config.js";

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [currentSalary, setCurrentSalary] = useState(0);
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);

        // Fetch Total Salary
        const incomeQuery = query(collection(db, "income"), where("userId", "==", user.uid));
        const incomeSnap = await getDocs(incomeQuery);
        let salary = 0;
        incomeSnap.forEach((doc) => {
          salary += parseFloat(doc.data().amount || 0);
        });
        setTotalSalary(salary);


        // Fetch Expenses
        const expensesQuery = query(collection(db, "expenses"), where("userId", "==", user.uid));
        const expensesSnap = await getDocs(expensesQuery);
        let userExpenses = [];
        expensesSnap.forEach((doc) => {
          userExpenses.push({ ...doc.data(), id: doc.id });
        });
        setExpenses(userExpenses);

        // Calculate Current Salary
        const totalExpenses = userExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        setCurrentSalary(salary - totalExpenses);
      }
    };

    fetchData();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const amountNum = parseFloat(amount);
    if (!category || !amount || isNaN(amountNum) || amountNum > currentSalary) {
      alert("Not valid balance");
      return;
    }

    const newExpense = {
      category,
      amount: amountNum,
      date: new Date().toLocaleDateString(),
      userId,
    };

    const docRef = await addDoc(collection(db, "expenses"), newExpense);
    newExpense.id = docRef.id;

    setExpenses([...expenses, newExpense]);
    setCurrentSalary(currentSalary - amountNum);
    setCategory("");
    setAmount("");
  };

  const handleDelete = async (id, amount) => {
    await deleteDoc(doc(db, "expenses", id));
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
    setCurrentSalary(totalSalary - totalExpenses);
  };

  const handleEdit = (exp) => {
    setEditId(exp.id);
    setEditAmount(exp.amount);
  };

  const handleSaveEdit = async (id) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === id ? { ...exp, amount: parseFloat(editAmount) } : exp
    );
    setExpenses(updatedExpenses);

    await updateDoc(doc(db, "expenses", id), {
      amount: parseFloat(editAmount),
    });

    const totalExpenses = updatedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    setCurrentSalary(totalSalary - totalExpenses);

    setEditId(null);
    setEditAmount("");
  };

  return (
    <div className="p-4">
      {/* Total Salary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-lime-300 text-blue-800 p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Balance</h3>
          <p className="text-xl">Rs {totalSalary}</p>
        </div>
        {/* Current Salary */}
        <div className="bg-blue-100 text-yellow-800 p-4 rounded shadow">
          <h3 className="text-lg font-bold">Current Balance</h3>
          <p className="text-xl">Rs {currentSalary}</p>
        </div>
      </div>

      {/* Add Expense inputs */}
      <form onSubmit={handleAddExpense} className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Add Expense</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <input type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded" />

          <input type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded" />

          <button type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 add-income">
            Add Expense
          </button>
        </div>
      </form>

      {/* Expenses table */}
      <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">All Expenses</h3>
           {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
       ) : (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-xs uppercase">
        <tr>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Actions</th>
         <th className="px-4 py-2"></th>
       </tr>
     </thead>
    <tbody>
       {expenses.map((exp) => (
    <tr key={exp.id} className="border-b">
        <td className="px-4 py-2">{exp.category}</td>
        <td className="px-4 py-2">
          {editId === exp.id ? (
          <input type="number"
           value={editAmount}
           onChange={(e) => setEditAmount(e.target.value)}
           className="border px-2 py-1 rounded w-24" />
       ) : (
          `Rs ${exp.amount}`
       )}
        </td>
         <td className="px-4 py-2">{exp.date}</td>
         <td className="px-4 py-2 space-x-2">
          {editId === exp.id ? (
           <button onClick={() => handleSaveEdit(exp.id)}
              className="bg-lime-600 text-white font-bold px-2 py-1 rounded text-sm">
               Save
           </button>
          ) : (
           <>
            <button onClick={() => handleEdit(exp)}
              className="bg-lime-300 text-blue-800 font-bold px-2 py-1 rounded text-sm">
               Edit
            </button>
           </>
          )}
         </td>
           <td className="px-4 py-2 space-x-2">
             <button onClick={() => handleDelete(exp.id, exp.amount)}
              className="bg-red-500 text-white font-bold px-2 py-1 rounded text-sm">
               Delete
             </button>
           </td>
          </tr>
        ))}
        </tbody>
       </table>
      </div>
     )}
    </div>
   </div>
  );
};

export default Dashboard;