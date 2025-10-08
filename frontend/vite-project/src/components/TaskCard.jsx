import React from 'react'
import ProgressBar from './ProgressBar';
import { useState } from 'react';
import TaskModel from './TaskModel';
import {detailIcon, adjustmentIcon, editIcon, deleteIcon} from '../../icons/icons.jsx';
import ConfirmModal from './ConfirmModal';

function TaskCard({title, detail, progress, totalProgress = 0, date, selectedTask}) {

  const [taskModelOpen, setTaskModelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const openDetailModal = () => {
    console.log("clicked");
  }

  const handleEditTask = () => {
    setTaskModelOpen(true);
    setIsEditing(true);
  }

  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  }

  return (
    <div className='min-w-[30rem] bg-white py-7 px-10 rounded-lg shadow-md space-y-4' >
        {taskModelOpen && <TaskModel selectedTask={selectedTask} setTaskModelOpen={setTaskModelOpen} isEditing={isEditing}/>}
        {openConfirmModal && <ConfirmModal selectedTask={selectedTask} setOpenConfirmModal={setOpenConfirmModal}/>}
        <div className='flex justify-between items-center'>
            <h4 className='text-xl font-bold'>{title}</h4>
            <div className='text-l text-gray-500 cursor-pointer relative group'>
              {detailIcon}
              <div className='bg-white py-1 pl-3 w-32 absolute top-5 right-0 shadow-md rounded-md text-violet-400 transition-all hidden group-hover:flex flex-col gap-5'>
                <button className='flex gap-2 hover:text-violet-700' onClick={handleEditTask}>{editIcon} Edit</button>
                <button className='hover:text-violet-700 flex gap-2' onClick={handleOpenConfirmModal}>{deleteIcon} Delete</button>
              </div>
            </div>
        </div>
        <p>{detail}</p>
        <div className='flex justify-between items-center text-gray-400'>
            <div className='flex items-center gap-2'>
              <span>{adjustmentIcon}</span>
              <p>Progress</p>
            </div>
            <p>{progress}/{totalProgress}</p>
        </div>
        <ProgressBar value={progress} total={totalProgress} />
        <span className='bg-red-200 text-red-500 py-2 px-5 rounded-md'>{date}</span>
    </div>
  )
}

export default TaskCard