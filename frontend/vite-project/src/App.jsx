import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./ui/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import TaskDetail from "./pages/TaskDetail";
import Tasks from "./pages/Tasks";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Calender from "./pages/Calender";
import Message from "./pages/Message";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";


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
        { path: "/", element: <Navigate to="/" replace /> },
        { path: "/tasks", element: <Tasks /> },
        { path: "/taskDetail/:taskId", element: <TaskDetail /> },
        { path: "/projects", element: <Projects /> },
        { path: "/clients", element: <Clients /> },
        { path: "/analytics", element: <Analytics /> },
        { path: "/calender", element: <Calender /> },
        { path: "/message", element: <Message /> },
        { path: "/reports", element: <Reports /> },
        { path: "/settings", element: <Settings /> },
      ],
    },
  ]);

  return <>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          color: "#000",
        },
      }}
    />
  </QueryClientProvider>
  </>
}

export default App;