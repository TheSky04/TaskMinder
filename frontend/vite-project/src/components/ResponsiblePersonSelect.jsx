import React, { useState, useEffect } from "react";

export default function ResponsiblePersonSelect({
  responsiblePerson,
  setResponsiblePerson,
  required = false
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  const handleChange = (e) => {
    setResponsiblePerson(e.target.value);
  };

  return (
    <div className="grid grid-cols-[.3rem_15rem_1fr] ml-5 gap-5 mt-10 items-center">
      {required ? <span className='text-red-500 text-2xl'>*</span> : <span></span>}
      <label htmlFor="responsiblePerson" className="text-2xl">
        Responsible Person
      </label>
      <select
        name="responsiblePerson"
        id="responsiblePerson"
        value={responsiblePerson || users[0]}
        onChange={handleChange}
        className="border border-violet-300 
                rounded-xl 
                px-3 py-2 
                text-violet-800 
                focus:outline-none 
                focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                hover:border-violet-400 
                transition 
                duration-200 
                shadow-sm 
                bg-white"
      >
        <option value={users[0]} disabled hidden>Select person</option>
        {users?.map((user) => (
          <option key={user.id} value={user?.id}>{user?.name}</option>
        ))}
      </select>
    </div>
  );
}
