import React from 'react'
import TaskCard from '../components/TaskCard'
import { useState } from 'react';
import TaskModel from '../components/TaskModel';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';


function Tasks() {

  const [taskModelOpen, setTaskModelOpen] = useState(false);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return response.json();
  };

    const { data: tasks, error, isLoading, isFetching } = useQuery({
      queryKey: ['tasks'],
      queryFn: fetchTasks,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes  
    });

    useEffect(() => {
      document.title = "Tasks - TaskMinder";
    }, []);

    if (isLoading || isFetching) return <p>Loading tasks...</p>;
    if (error) return <p>Error fetching tasks: {error.message}</p>;

  return (
    <>
        <button className="bg-violet-500 py-2 px-5 m-2 ml-5 rounded-md text-white cursor-pointer hover:bg-violet-600 transition-all ease-in-out" onClick={() => setTaskModelOpen(true)}>Create Task</button>
        {taskModelOpen && <TaskModel fetchTasks={fetchTasks} setTaskModelOpen={setTaskModelOpen}/>}
        <div className="p-5 flex gap-5 overflow-x-auto w-[80vw] scrollbar">
          {tasks.map((task) => (<TaskCard key={task.id} title={task.projectName} detail={task.taskName} progress={task.progress} totalProgress={task.totalProgress} date={task.date.slice(0,10)}></TaskCard>))}
        </div>
    </>
  )
}

export default Tasks