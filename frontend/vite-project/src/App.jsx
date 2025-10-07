import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./ui/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";

import TaskDetail from "./pages/TaskDetail";
import Tasks from "./pages/Tasks";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Calender from "./pages/Calender";
import Message from "./pages/Message";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProvider from "../context/userProvider.jsx";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" replace /> },
        { path: "/tasks", element: <PrivateRoute><Tasks /></PrivateRoute> },
        { path: "/taskDetail/:taskId", element: <PrivateRoute><TaskDetail /></PrivateRoute> },
        { path: "/projects", element: <PrivateRoute><Projects /></PrivateRoute> },
        { path: "/clients", element: <PrivateRoute><Clients /></PrivateRoute> },
        { path: "/analytics", element: <PrivateRoute><Analytics /></PrivateRoute> },
        { path: "/calender", element: <PrivateRoute><Calender /></PrivateRoute> },
        { path: "/message", element: <PrivateRoute><Message /></PrivateRoute> },
        { path: "/reports", element: <PrivateRoute><Reports /></PrivateRoute> },
        { path: "/settings", element: <PrivateRoute><Settings /></PrivateRoute> },
        { path: "/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute> },
      ],
    },

    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                color: "#000",
              },
            }}
          />
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}

export default App;
