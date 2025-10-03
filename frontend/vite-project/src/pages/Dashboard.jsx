import React, { useEffect, useState } from "react";
import api from "../services/authService";

export default function Dashboard() {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const res = await api.get("/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
            } catch (err) {
                setData("Erişim reddedildi veya token süresi doldu.");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
