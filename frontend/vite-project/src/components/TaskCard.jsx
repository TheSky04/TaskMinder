import React from 'react'
import ProgressBar from './ProgressBar';

function TaskCard({title, detail, progress, totalProgress = 0, date}) {

    const detailIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>)
    const adjustmentIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>);

  return (
    <div className='min-w-[30rem] bg-white py-7 px-10 rounded-lg shadow-md space-y-4' >
        <div className='flex justify-between items-center'>
            <h4 className='text-xl font-bold'>{title}</h4>
            <p className='text-l text-gray-500'>{detailIcon}</p>
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