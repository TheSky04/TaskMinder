import React, { useState } from 'react'
import InputBlock from './InputBlock'
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';


function TaskModel({ setTaskModelOpen }) {
    const [projectName, setProjectName] = useState('');
    const [taskName, setTaskName] = useState('');
    const [progress, setProgress] = useState(0);
    const [totalProgress, setTotalProgress] = useState(0);
    const [date, setDate] = useState('');
    const queryClient = useQueryClient();


    const createTaskMutation = useMutation({
        mutationFn: async (newTask) => {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }

        return response.json(); 
        },

        onSuccess: () => {
        toast.success('Task created successfully!');
        queryClient.invalidateQueries(['tasks']);
        setTaskModelOpen(false);
        },

        onError: (error) => {
        toast.error(error.message);
        },
    });

    const handleCreateTask = () => {
        const newTask = { projectName, taskName, progress, totalProgress, date };
        createTaskMutation.mutate(newTask);
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-gray bg-opacity-90 backdrop-blur-sm z-9"
                onClick={() => setTaskModelOpen(false)}
            ></div>

            <div className='pl-10 p-10 rounded-md absolute bg-white shadow-md w-[50rem] h-[40rem] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                <h4 className='text-center text-3xl my-5'>Create Task</h4>
                <button
                    className='text-3xl ml-auto absolute right-5 top-2 hover:opacity-50 cursor-pointer transition-all ease-in-out'
                    onClick={() => setTaskModelOpen(false)}
                >
                    &times;
                </button>

                <InputBlock id="projectName" label="Project Name" type="text" value={projectName} onChange={setProjectName} />
                <InputBlock id="taskName" label="Task Name" type="text" value={taskName} onChange={setTaskName} />
                <InputBlock id="progress" label="Progress" type="number" value={progress} onChange={setProgress} />
                <InputBlock id="totalProgress" label="Total Progress" type="number" value={totalProgress} onChange={setTotalProgress} />
                <InputBlock id="date" label="Date" type="date" value={date} onChange={setDate} />

                <div className='text-center mt-10'>
                    <button
                        onClick={handleCreateTask}
                        className='bg-violet-500 py-2 px-5 ml-5 rounded-md text-white cursor-pointer hover:bg-violet-600 transition-all ease-in-out'
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskModel
