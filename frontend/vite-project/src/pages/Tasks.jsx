import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import TaskCard from '../components/TaskCard';
import TaskModel from '../components/TaskModel';
import UserContext from '../../context/userContext';

function Tasks() {
  const [taskModelOpen, setTaskModelOpen] = useState(false);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('authToken');

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  };

  const { data: tasks = [], error, isLoading, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,

  });

  useEffect(() => {
    document.title = "Tasks - TaskMinder";
  }, []);

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks: {error.message}</p>;

  return (
    <>
      <button
        className="bg-violet-500 py-2 px-5 m-2 ml-5 rounded-md text-white cursor-pointer hover:bg-violet-600 transition-all ease-in-out"
        onClick={() => setTaskModelOpen(true)}
      >
        Create Task
      </button>

      {taskModelOpen && <TaskModel refetchTasks={refetch} setTaskModelOpen={setTaskModelOpen} />}

      <div className="p-5 flex gap-5 overflow-x-auto w-[80vw] scrollbar">
        {tasks.map((task) => (
          <TaskCard
            selectedTask={task}
            key={task.id}
            title={task.projectName}
            detail={task.taskName}
            progress={task.progress}
            totalProgress={task.totalProgress}
            date={task.date.slice(0,10)}
          />
        ))}
      </div>
    </>
  );
}

export default Tasks;
